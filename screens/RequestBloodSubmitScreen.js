import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Modal, TouchableOpacity, StyleSheet,AsyncStorage,Dimensions,Image,Linking} from 'react-native';
import { Font } from 'expo';
import { Map, InputText, InputTextLarge , PickerPartTouch, PickerModalDate, PickerModalBlood, BaseButton, Button, ButtonBack,PickerModalProvince} from '../components/common';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationActions } from 'react-navigation'
import addressServer from '../utilities/addressServer';
import axios from 'axios'
import { CmPrasanmitText, CmPrasanmitBoldText } from '../components'

export default class RequestSubmitScreen extends Component {


    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        //console.log('sadfasdlfuiln')
        //console.log(navigation)
        return {
            headerTintColor: Colors.tintColor,
            headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
            headerStyle: {backgroundColor: Colors.tabBar},
            gesturesEnabled: false,
            headerTitle:'คำร้องขอรับเลือด',
            headerLeft: <ButtonBack onPress={() => props.screenProps.goBack()} color='white' />,
        };
    };


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
        modalNumber: false,
        confirm: false,
        loadingModal: false,
    }

    componentWillMount() {
        AsyncStorage.getItem('@loginData:key')
        .then((loginStatus) => {
            const temp = JSON.parse(loginStatus)
            this.setState({ token : temp.token})
        })
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
        const url="http://maps.google.com/maps?daddr=("+ this.state.region.latitude + "," + this.state.region.longitude + ")";
        return(
            <View style={[styles.container,{flex:1,backgroundColor:'transparent'}]}>
                <View style={{flex:1,alignItems: 'center',width:Dimensions.get('window').width,backgroundColor:'#FAFAFA'}}>
                    <ScrollView style={{flex: 1,width:Dimensions.get('window').width, backgroundColor: '#FAFAFA'}}>
                        <PickerModalBlood
                            pickerVisible = {this.state.modalpatient_bloodVisible}
                            onPressCancel = {() => this.setState({modalpatient_bloodVisible : false })}
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
                                    this.setState({modalpatient_bloodVisible : false })
                                }}
                            selectOne = {this.state.patient_bloodTemp}
                            onChangeOne = {(itemValue, itemIndex) => this.setState({patient_bloodTemp: itemValue})}
                            selectTwo = {this.state.patient_blood_typeTemp}
                            onChangeTwo = {(itemValue2, itemIndex2) => this.setState({patient_blood_typeTemp: itemValue2})}
                        />
                        <PickerModalProvince
                            pickerVisible = {this.state.modalProvinceVisible}
                            onPressCancel = {() => this.setState({modalProvinceVisible : false})}
                            onPressSubmit = {() => {
                                this.state.patient_province = this.state.patient_provinceTemp
                                this.setState({modalProvinceVisible : false})
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
                                onPress={() => this.setState({modalpatient_bloodVisible : true})}
                                information={<Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{this.state.patient_blood + this.state.patient_blood_type }</Text>}
                            />
                            <InputText
                                label = 'จำนวนเลือดที่ต้องการ (ไม่เกิน 10 ถุง)'
                                onChangeText={(countblood) => countblood > 10 ? this.setState({countblood : '10'}) : this.setState({countblood})}
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
                                onPress={() => this.setState({modalProvinceVisible : true})}
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
                            onPress={() => Linking.openURL(url)}
                        />
                        <View style={{marginTop:20}}></View>
                            <Button
                                title="ส่งคำร้องขอ"
                                touchable={(canSubmit.search("0") !== -1) ? true : false}
                                onPress={(canSubmit.search("0") !== -1) ? null : this._goToConfirmRequest}
                                buttonColor={(canSubmit.search("0") !== -1) ? '#F6B6BF' : '#E84A5F'}
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
        );
    }

    _goToConfirmRequest = () => {
        this.props.navigation.navigate('RequestConfirm',{ detail : this.state, navigation : this.props.screenProps})
    }

    _findLocation() {
        let patient_nameLocation = this.state.patient_hos + this.state.patient_province
        const API_KEY = 'AIzaSyAuyEycAxVaRvLY5CuQ84d3eFXU0PSf1Jg&libraries=places'
        let APIGeocodingRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + patient_nameLocation + '&key=' + API_KEY
        fetch(APIGeocodingRequest)
        .then((response) => response.json())
        .then((responseJSON) => {
            this.setState({region : { latitude: responseJSON.results[0].geometry.location.lat, longitude: responseJSON.results[0].geometry.location.lng, latitudeDelta: 0.00922, longitudeDelta: 0.00421}});
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
});

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}