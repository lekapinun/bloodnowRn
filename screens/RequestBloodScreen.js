import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Modal, TouchableOpacity, Picker, StyleSheet,AsyncStorage,Dimensions, TouchableWithoutFeedback ,Animated,Image} from 'react-native';
import { Font } from 'expo';
import { Map, InputText, InputTextLarge , PickerPartTouch, PickerModalDate, PickerModalBlood, BaseButton, Button, ButtonBack,DetailBox,PickerModalProvince} from '../components/common';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationActions } from 'react-navigation'
import addressServer from '../utilities/addressServer';
import RequestSubmitScreen from './RequestBloodSubmitScreen';
import axios from 'axios'
import { CmPrasanmitText, CmPrasanmitBoldText } from '../components'

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
        AsyncStorage.getItem('@loginData:key')
        .then((loginStatus) => {
            const temp = JSON.parse(loginStatus)
            this.setState({ token : temp.token})
        })
        var rand_x = Layout.window.height; 
        var rand_y = 0; 
        this.positon = new Animated.ValueXY({ x: rand_y, y: rand_x});
       /* Animated.decay(this.positon,{
            toValue: { x: 0, y: 0}
        }).start();*/
    }

    state = {
        token: '',
        patient_name: '',
        patient_id: '',
        patient_blood: '',
        patient_blood_type: '',
        patient_bloodUnit: '',
        countblood: '',
        patient_detail: '',
        patient_hos: 'โรงพยาบาล',
        patient_bloodTemp: '',
        patient_blood_typeTemp: '',
        patient_hos_la: '',
        patient_hos_long: '',
        patient_province: '',
        patient_provinceTemp: 'กรุงเทพมหานคร',
        region: {
            latitude: 18.788488, 
            longitude: 98.971420, 
            latitudeDelta: 0.00922, 
            longitudeDelta: 0.00421
        },
        modalpatient_bloodVisible: false,
        modalProvinceVisible: false,
        confirm: false,
        displayRequest: true,
        displayConfirm: false,
        displayValidate: false,
    }

    setModalpatient_bloodVisible(visible) {
        this.setState({modalpatient_bloodVisible: visible});
    }

    setModalProvinceVisible(visible) {
      this.setState({modalProvinceVisible: visible});
    }

    renderPageREQUEST = () => {
        if( this.state.displayConfirm === true){
            return (
                <View style={[styles.container,{height:Layout.window.height,backgroundColor:'transparent',position:'absolute'}]}>
                    <ModalValidate
                        pickerVisible = {this.state.displayValidate}
                        onPress = { () => {
                            this.setState({displayValidate: false})
                            this._backToRequest()
                        } }
                    >
                    </ModalValidate>
                        <Animated.View style={[this.positon.getLayout(),{flex:1}]}>
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
                                        <DetailBox label='ชื่อผู้ป่วย' information={this.state.patient_name} />
                                        <DetailBox label='รหัสผู้ป่วย' information={this.state.patient_id}/>
                                        <DetailBox label='กรุ๊ปเลือด' information={this.state.patient_blood+this.state.patient_blood_type} />
                                        <DetailBox label='จำนวนเลือดที่ต้องการ' information={this.state.countblood + ' ถุง'} />
                                        <DetailBox label='รายละเอียด' information={this.state.patient_detail}/>
                                        <DetailBox label='จังหวัด' information={this.state.patient_province}/>
                                        <DetailBox label='สถานพยาบาล' information={this.state.patient_hos}/>
                                        <View style={{marginTop:25,flexDirection:'row'}}>
                                            <View style={styles.borderBottom}>
                                                <Button
                                                    title='ยืนยัน'
                                                    onPress={this._ConfirmRequest}
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
        let canSubmit = '0000000';
        (this.state.patient_name !== '' ) ? canSubmit = canSubmit.replaceAt(0,'1') : canSubmit = canSubmit.replaceAt(0,'0') ;
        (this.state.patient_id !== '' ) ? canSubmit = canSubmit.replaceAt(1,'1') : canSubmit = canSubmit.replaceAt(1,'0') ;
        (this.state.patient_blood !== '' ) ? canSubmit = canSubmit.replaceAt(2,'1') : canSubmit = canSubmit.replaceAt(2,'0') ;
        (this.state.patient_blood_type !== '' ) ? canSubmit = canSubmit.replaceAt(3,'1') : canSubmit = canSubmit.replaceAt(3,'0') ;
        (this.state.countblood !== '' ) ? canSubmit = canSubmit.replaceAt(4,'1') : canSubmit = canSubmit.replaceAt(4,'0') ;
        (this.state.patient_detail !== '' ) ? canSubmit = canSubmit.replaceAt(5,'1') : canSubmit = canSubmit.replaceAt(5,'0') ;
        (this.state.patient_hos !== '' ) ? canSubmit = canSubmit.replaceAt(6,'1') : canSubmit = canSubmit.replaceAt(6,'0') ;

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
                                <PickerModalProvince
                                    pickerVisible = {this.state.modalProvinceVisible}
                                    onPressCancel = {() => { this.setModalProvinceVisible(!this.state.modalProvinceVisible) }}
                                    onPressSubmit = {() => {
                                        this.state.patient_province = this.state.patient_provinceTemp
                                        this.setModalProvinceVisible(!this.state.modalProvinceVisible);
                                    }}
                                    selectOne = {this.state.patient_provinceTemp}
                                    onChangeOne = {(itemValue, itemIndex) => this.setState({patient_provinceTemp: itemValue}) }
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
                                        information={<Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{this.state.patient_blood + this.state.patient_blood_type }</Text>}
                                    />
                                    <InputText
                                        label = 'จำนวนเลือดที่ต้องการ(ถุง)'
                                        onChangeText={(countblood) => this.setState({countblood})}
                                        value={this.state.countblood}
                                        keyboardType='number-pad'
                                    />
                                    <InputTextLarge
                                        label = 'รายละเอียด'
                                        onChangeText={(patient_detail) => this.setState({patient_detail})}
                                        value={this.state.patient_detail}
                                    />
                                    <PickerPartTouch
                                        label='จังหวัด'
                                        onPress={() => this.setModalProvinceVisible(true)}
                                        information={<Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{this.state.patient_province}</Text>}
                                    />
                                    <InputText
                                        label = 'สถานพยาบาล'
                                        onChangeText={(patient_hos) => this.setState({patient_hos})}
                                        value={this.state.patient_hos}
                                        onEndEditing={() => this._findLocation()}
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
                                            touchable={(canSubmit === '0000000') ? true : false}
                                            onPress={(canSubmit === '0000000') ? null : this._goToConfirmRequest}
                                            buttonColor={(canSubmit === '0000000') ? '#F6B6BF' : '#E84A5F'}
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
        this.setState({displayRequest : false,displayConfirm : false})
        const resetAction = NavigationActions.reset({index: 0,
            actions: [ 
                NavigationActions.navigate({ routeName: 'RequestHistory'}) ,
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    _backToRequest = () => {
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
        var rand_x = Layout.window.height; 
        var rand_y = 0; 
        this.positon = new Animated.ValueXY({ x: rand_y, y: rand_x});
        Animated.timing(this.positon,{
            toValue: { x: 0, y: 0},
        }).start();
        this.forceUpdate();
    }

    _ConfirmRequest = () => {
        this.state.patient_hos_la = this.state.region.latitude.toString()
        this.state.patient_hos_long = this.state.region.longitude.toString()
        console.log(this.state)
        console.log(addressServer.APIRequest + '/api/req');
        const api = addressServer.APIRequest + '/api/req';
        axios(api,{ 
            method: 'post', 
            headers: {'Authorization' : 'Bearer ' + this.state.token},
            data : this.state
        })
            .then(response => {
                console.log(response)
                if(response.status === 200 && response.data !== 'patient same'){
                    const resetAction = NavigationActions.reset(
                        {
                            index: 0,
                            actions: [ 
                                NavigationActions.navigate({ routeName: 'RequestHistory'}) ,
                            ]
                        }
                    )
                    this.props.navigation.dispatch(resetAction)
                } else {
                    this.setState({displayValidate: true})
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    _findLocation() {
        let patient_nameLocation = this.state.patient_hos + this.state.patient_province
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

const ModalValidate = ({pickerVisible,onPress}) => {
  return(
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={pickerVisible}
      >
        <View style={[styles.container,{flex:1,backgroundColor:'rgba(52, 52, 52, 0.3)'}]}>
            <View style={{paddingTop:25,alignItems: 'center',height:200,width:230,backgroundColor:'white',borderRadius:10}}>
                <Image source={require('../assets/images/error.png')} style={{height:70,width:70}}/>
                <CmPrasanmitText style={{paddingTop:10,height:40,fontSize:25}}>คำร้องขอนี้ถูกสร้างแล้ว</CmPrasanmitText>
                <View style={{borderBottomColor: Colors.underlinePopup, width:230, marginTop:20,borderBottomWidth: 1,}}/>
                <View style={{marginTop: 10}}>
                <BaseButton
                    onPress={onPress}
                    title='ตกลง'
                    ButtonStyle = {{backgroundColor: 'transparent', width: 200,}}
                    fontStyle={[Font.style('CmPrasanmitBold'),{color: 'red',fontSize:25}]}
                />
                </View> 
            </View>
        </View>
      </Modal>
  );
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

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
