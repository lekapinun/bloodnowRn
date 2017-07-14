import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Modal, TouchableOpacity, Picker, StyleSheet,AsyncStorage,Dimensions, TouchableWithoutFeedback ,Animated} from 'react-native';
import { Font } from 'expo';
import { Map, InputText, InputTextLarge , PickerPartTouch, PickerModalDate, PickerModalBlood, Button, ButtonBack,DetailBox,} from '../components/common';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationActions } from 'react-navigation'
import addressServer from '../utilities/addressServer';
import RequestSubmitScreen from './RequestBloodSubmitScreen';

export default class RequestBloodScreen extends Component {

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        //console.log(navigation)
        //console.log(props)
        return {
            title: 'คำร้องขอรับเลือด',
            headerTintColor: Colors.tintColor,
            headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
            headerStyle: {backgroundColor: Colors.tabBar},
            gesturesEnabled: false,
            headerLeft: null
        };
    };


    componentWillMount() {
        var rand_x = Layout.window.height; 
        var rand_y = 0; 
        this.positon = new Animated.ValueXY({ x: rand_y, y: rand_x});
       /* Animated.decay(this.positon,{
            toValue: { x: 0, y: 0}
        }).start();*/
    }

    state = {
        patient_name: '',
        patient_id: '',
        patient_blood: '',
        patient_blood_type: '',
        patient_bloodUnit: '',
        countblood: 0,
        patient_detail: '',
        patient_hos: '',
        patient_bloodTemp: 'A',
        patient_blood_Temp: '+',
        patient_hos_la: '',
        patient_hos_long: '',
        patient_province: 'เชียงใหม่',
        region: {
            latitude: 18.788488, 
            longitude: 98.971420, 
            latitudeDelta: 0.00922, 
            longitudeDelta: 0.00421
        },
        modalpatient_bloodVisible: false,
        confirm: false,
        displayRequest: true,
        displayConfirm: false,
    }

    setModalpatient_bloodVisible(visible) {
        this.setState({modalpatient_bloodVisible: visible});
    }

    renderPageREQUEST = () => {
        if( this.state.displayConfirm === true){
            return (
                <View style={[styles.container,{flex:1,backgroundColor:'transparent',position:'absolute'}]}>
                        <Animated.View style={this.positon.getLayout()}>
                            <View style={{height:20,width:Layout.window.width,backgroundColor: Colors.tabBar}}/>
                            <View style={{height:44,flexDirection:'row',justifyContent: 'space-between',width:Layout.window.width,backgroundColor: Colors.tabBar}}>
                                <View style={[styles.center,{height:44,width:80}]}>
                                    <ButtonBack onPress={this._backToRequest} color='white' />
                                </View>
                                <View style={[styles.center,{height:44,width:Layout.window.width-160}]}>
                                    <Text style={[Font.style('CmPrasanmitBold'),{fontSize:29,color:'white'}]}>คำร้องขอรับเลือด</Text>
                                </View>
                                <View style={{height:44,width:80}}></View>
                            </View>
                            <View style={{flex: 1,width:Dimensions.get('window').width,flexDirection: 'column',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
                            
                            <ScrollView style={{flex: 1}}>
                            <View style={{flex: 1,width:Dimensions.get('window').width,flexDirection: 'column',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
                                <View style={{marginTop:15}}></View>
                                <DetailBox label='ชื่อผู้ป่วย' information='อักศร แลดูดี'/>
                                <DetailBox label='รหัสผู้ป่วย' information='14249269'/>
                                <DetailBox label='กรุ๊ปเลือด' information='O-' />
                                <DetailBox label='จำนวนเลือดที่ต้องการ' information='5 ถุง' />
                                <DetailBox label='รายละเอียด' information='อักศรไปทำหน้า หมอจัดหนักไปหน่อยมีดแทงเข้าไปหัวใจ ไม่รู้เหมือนกันว่าไปโดยหัวใจอีศรได้ยังไง'/>
                                <DetailBox label='จังหวัด' information='เชียงใหม่'/>
                                <DetailBox label='สถานพยาบาล' information='กรุงเทพ'/>
                                <View style={{marginTop:25,flexDirection:'row'}}>
                                    <View style={styles.borderBottom}>
                                        <Button
                                            title='ยืนยัน'
                                            onPress={() => {}}
                                            buttonColor='#E84A5F'
                                            sizeFont={25}
                                            ButtonWidth={100}
                                            ButtonHeight={40}
                                            colorFont='white'
                                        />
                                    </View>
                                    <View style={{marginLeft:15}} ></View>
                                    <View style={styles.borderBottom}>
                                        <Button
                                            title='ยกเลิก'
                                            onPress={this._backToHistory}
                                            buttonColor='white'
                                            sizeFont={25}
                                            ButtonWidth={100}
                                            ButtonHeight={40}
                                            colorFont= {Colors.tabBar}
                                        />
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                        </View>
                        </Animated.View>
                    </View>
            );
        }
    }
    

    render() {
        if(this.state.patient_blood !== ''){
            blood = <Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{this.state.patient_blood + this.state.patient_blood_type }</Text>;
        }else{
            blood = <Text />
        }
        return(
            <View style={{flex: 1,flexDirection: 'column',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible= {true}
                >
                    <View style={[styles.container,{flex:1,backgroundColor:'transparent'}]}>
                        <View style={{height:20,width:Layout.window.width,backgroundColor: Colors.tabBar}}/>
                            <View style={{height:44,flexDirection:'row',justifyContent: 'space-between',width:Layout.window.width,backgroundColor: Colors.tabBar}}>
                            <View style={[styles.center,{height:44,width:80}]}>
                                <ButtonBack onPress={this._backToHistory} color='white' />
                            </View>
                            <View style={[styles.center,{height:44,width:Layout.window.width-160}]}>
                                <Text style={[Font.style('CmPrasanmitBold'),{fontSize:29,color:'white'}]}>คำร้องขอรับเลือด</Text>
                            </View>
                            <View style={{height:44,width:80}}></View>
                        </View>
                        <View style={{flex:1,alignItems: 'center',width:Dimensions.get('window').width,backgroundColor:'#FAFAFA'}}>
                            <ScrollView style={{flex: 1,width:Dimensions.get('window').width, backgroundColor: '#FAFAFA'}}>
                                <PickerModalBlood
                                        pickerVisible = {this.state.modalpatient_bloodVisible}
                                        onPressCancel = {() => { this.setModalpatient_bloodVisible(!this.state.modalpatient_bloodVisible)}}
                                        onPressSubmit = {() => {
                                            if(this.state.patient_bloodTemp === ''){
                                            this.setState({patient_blood: 'A'});
                                            }else{
                                            this.setState({patient_blood: this.state.patient_bloodTemp});
                                            }  
                                            if(this.state.patient_blood_typeTemp === ''){
                                            this.setState({patient_blood_type: '+'});
                                            }else{
                                            this.setState({patient_blood_type: this.state.patient_blood_typeTemp});
                                            }          
                                            this.setModalpatient_bloodVisible(!this.state.modalpatient_bloodVisible);
                                        }}
                                        selectOne = {this.state.patient_bloodTemp}
                                        onChangeOne = {(itemValue, itemIndex) => this.setState({patient_bloodTemp: itemValue})}
                                        selectTwo = {this.state.patient_blood_typeTemp}
                                        onChangeTwo = {(itemValue2, itemIndex2) => this.setState({patient_blood_typeTemp: itemValue2})}
                                    />
                                <View style={{alignItems: 'center'}}>
                                    <View style={{width: 310,marginTop:15}}>
                                    <InputText
                                        label = 'ชื่อผู้ป่วย'
                                        onChangeText={(patient_name) => this.setState({patient_name})}
                                        value={this.state.patient_name}
                                    />
                                    <InputText
                                        label = 'รหัสผู้ป่วย'
                                        onChangeText={(patient_id) => this.setState({patient_id})}
                                        value={this.state.patient_id}
                                    />
                                    <PickerPartTouch
                                        label='กรุ๊ปเลือด'
                                        onPress={() => this.setModalpatient_bloodVisible(true)}
                                        information={blood}
                                    />
                                    <InputText
                                        label = 'จำนวนเลือดที่ต้องการ(ยูนิต)'
                                        onChangeText={(patient_bloodUnit) => this.setState({patient_bloodUnit})}
                                        value={this.state.patient_bloodUnit}
                                        keyboardType='number-pad'
                                    />
                                    <InputTextLarge
                                        label = 'รายละเอียด'
                                        onChangeText={(patient_detail) => this.setState({patient_detail})}
                                        value={this.state.patient_detail}
                                    />
                                    <InputText
                                        label = 'สถานพยาบาล'
                                        onChangeText={(patient_hos) => this.setState({patient_hos})}
                                        value={this.state.patient_hos}
                                        onEndEditing={this._findLocation}
                                    />
                                    </View>
                                    <View style={{marginTop:40}}></View>
                                    <Map
                                    region={this.state.region}
                                    onRegionChange={(region) => {this.setState({region})}}
                                    />
                                    <View style={{marginTop:20}}></View>
                                        <Button
                                            title="ส่งคำร้องขอ"
                                            onPress={this._goToConfirmRequest}
                                            buttonColor='#E84A5F'
                                            sizeFont={25}
                                            ButtonWidth={300}
                                            ButtonHeight={50}
                                            colorFont='white'
                                        />
                                    </View>
                                    <View style={{marginTop:40}}></View>
                            </ScrollView>
                        </View>
                    </View>

                    {this.renderPageREQUEST()}
                    

                </Modal>
            </View>
        );
    }
    

    _backToHistory = () => {
        //this.setState({displayRequest : false,displayConfirm : false})
<<<<<<< HEAD
        this.props.navigation.goBack()
    }

    _backToHistory2 = () => {
        //this.setState({displayConfirm : false})
        //setTimeout(() => {
          //  this.setState({displayRequest : false})
        //this.setState({displayConfirm : false})
        this.props.navigation.goBack()
       // },0)
=======
        const resetAction = NavigationActions.navigate(
            {
                index: 0,
                actions: [ 
                    NavigationActions.navigate({ routeName: 'RequestHistory'}) ,
                ]
            }
        )
        this.props.navigation.dispatch(resetAction)
>>>>>>> master
    }

    _backToRequest = () => {
        //this.setState({displayRequest: true})
        //this.setState({displayConfirm : false})
        var rand_x = 0; 
        var rand_y = 0; 
        this.positon = new Animated.ValueXY({ x: rand_y, y: rand_x});
        Animated.timing(this.positon,{
            toValue: { x: 0, y: Layout.window.height},
        }).start();

        this.forceUpdate();
        setTimeout(() => {
            this.setState({displayConfirm: false})
        },500)
    }

    

    _goToConfirmRequest = () => {
        this.setState({displayConfirm: true})
        /*this.setState({displayRequest: false})*/
        var rand_x = Layout.window.height; 
        var rand_y = 0; 
        this.positon = new Animated.ValueXY({ x: rand_y, y: rand_x});
        Animated.timing(this.positon,{
            toValue: { x: 0, y: 0},
        }).start();
        this.forceUpdate();
        
        //this.setState({displayRequest : false})
        /*AsyncStorage.setItem('@RequestData:key', JSON.stringify(this.state))
        .then(() => {
            const resetAction = NavigationActions.reset({
                index: 2,
                actions: [ 
                    NavigationActions.navigate({ routeName: 'RequestHistory'}) ,
                    NavigationActions.navigate({ routeName: 'Requestpatient_blood'}) ,
                    NavigationActions.navigate({ routeNamee: 'RequestSubmit'})   
                ]
            })
            this.props.navigation.dispatch(resetAction)
        })
        .catch((error) => {
        console.log(error);
        });*/
    }

    _ConfirmRequest = () => {
        console.log(addressServer.IPMac.toString() + '/request');
        const api = addressServer.IPMac.toString() + '/request';
        const myRequest = new Request(
        api,
        {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        });
        fetch(myRequest)
        .then((response) => response.text())
        .then((responseText) => {
            console.log(responseText);
        })
        .catch((error) => {
        this.setState({load: false});
        console.log(error);
        });
    }

    _findLocation = () => {
        let patient_nameLocation = this.state.patient_hos
        const API_KEY = 'AIzaSyAuyEycAxVaRvLY5CuQ84d3eFXU0PSf1Jg&libraries=places'
        let APIGeocodingRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + patient_nameLocation + '&key=' + API_KEY
        //console.log(APIGeocodingRequest)
        fetch(APIGeocodingRequest)
        .then((response) => response.json())
        .then((responseJSON) => {
        //console.log(responseJSON.results[0].geometry.location.lat)
        //console.log(responseJSON.results[0].geometry.location.lng)
        this.setState({region : { latitude: responseJSON.results[0].geometry.location.lat, longitude: responseJSON.results[0].geometry.location.lng, latitudeDelta: 0.00922, longitudeDelta: 0.00421}});
        //this.setState({lng : responseJSON.results[0].geometry.location.lng});
        //console.log(this.state)
        })
        .catch((error) => {
        console.log(error)
    })
    }

}

const styles = StyleSheet.create({
    center: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        height: 50,
        width:270,
        marginTop:10,
        paddingLeft:10,
        fontSize: 23,
        backgroundColor: 'white',
    },
    headerContainerStyle: {

    },
    headerStyle: {

    },
    bodyContainerStyle: {
        alignSelf: 'center',
        borderColor: '#EEEDEE',
        borderBottomWidth: 1,
        margin: 10,
    },
    bodyMultiLineContainerStyle: {
        borderColor: '#EEEDEE',
        borderWidth: 1,
        alignSelf: 'center',
        width: 300,
        height: 150,
        padding: 10,
        fontSize: 23,
    },
    pickerText:{
        marginTop:10,
        paddingLeft:10,
        fontSize: 23,
    },
    pickerContainer: {
        height: 50,
        marginTop: 10,
        alignSelf: 'center',
        borderColor: '#EEEDEE',
        borderWidth: 1
    },
    borderBottom: {
        borderColor: Colors.tabBar,
        borderWidth: 1
    }
});
