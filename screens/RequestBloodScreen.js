import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Modal, TouchableOpacity, Picker, StyleSheet,AsyncStorage,Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { Map, InputText, InputTextLarge , PickerPartTouch, PickerModalDate, PickerModalpatient_blood, Button} from '../components/common';
import Colors from '../constants/Colors';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationActions } from 'react-navigation'

export default class Requestpatient_bloodScreen extends Component {

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
        };
    };


    static tabBarOptions = {
        tabBarVisible: false
    };

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
        ConfirmationModalVisible: false,
        confirm: false,
        display: true,
    }

    setModalpatient_bloodVisible(visible) {
    this.setState({modalpatient_bloodVisible: visible});
    }
    setConfrimationModalVisible(visible) {
        this.setState({ConfirmationModalVisible: visible});
    }

    render() {
        if(this.state.patient_blood !== ''){
        patient_blood = <Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{this.state.patient_blood + this.state.patient_blood_type }</Text>;
      }else{
        patient_blood = <Text />
      }
        return(
            <View>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible= {this.state.display}
                >
                    <View style={[styles.container,{flex:1,width:Dimensions.get('window').width,backgroundColor:'transparent'}]}>
                        <View style={{height:20,width:0}}>
                            {/*<View style={{height:20,backgroundColor:'red',width:Dimensions.get('window').width}}></View>*/}
                        </View>
                        <View style={{height:44,width:Dimensions.get('window').width}}>
                            <TouchableWithoutFeedback onPress={() => {
                                this.setState({display : false})
                                this.props.navigation.goBack()
                            }}>
                                <View style={{height:44,width:80}}></View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{flex:1,alignItems: 'center',width:Dimensions.get('window').width,backgroundColor:'#FAFAFA'}}>
                            <ScrollView style={{flex: 1,width:Dimensions.get('window').width, backgroundColor: '#FAFAFA'}}>
                                <PickerModalpatient_blood
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
                                        information={patient_blood}
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
                                    <View style={{marginTop:40}}></View>
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
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            {/*<ScrollView style={{flex: 1,flexDirection: 'column', backgroundColor: '#FAFAFA'}}>
                <PickerModalpatient_blood
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
                        information={patient_blood}
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
                    <View style={styles.request}></View>
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
            </ScrollView>*/}
            
            </View>
        );
    }

    _goToConfirmRequest = () => {
        //this.setState({display : false})
        AsyncStorage.setItem('@RequestData:key', JSON.stringify(this.state))
        .then(() => {
            const resetAction = NavigationActions.reset({
                index: 2,
                actions: [ 
                    NavigationActions.navigate({ routepatient_name: 'RequestHistory'}) ,
                    NavigationActions.navigate({ routepatient_name: 'Requestpatient_blood'}) ,
                    NavigationActions.navigate({ routepatient_name: 'RequestSubmit'})   
                ]
            })
            this.props.navigation.dispatch(resetAction)
        })
        .catch((error) => {
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
});
