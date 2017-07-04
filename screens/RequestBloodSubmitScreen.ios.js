import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Modal, TouchableOpacity, Picker, StyleSheet,AsyncStorage, Image } from 'react-native';
import { Font } from 'expo';
import { Map, InputText, InputTextLarge , PickerPartTouch, PickerModalDate, PickerModalBlood, Button, ButtonBack, DetailBox} from '../components/common';
import Colors from '../constants/Colors';
import addressServer from '../utilities/addressServer';
import { NavigationActions } from 'react-navigation'
import { TestButton, NavigatorBackground,ExNavigationState} from '../components/common';


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
            headerLeft: <ButtonBack onPress={() => navigation.goBack()} color='white' />,
        };
    };


    state = {
        patient_name: '',
        patient_id: '',
        patient_blood: '',
        patient_blood_type: '',
        countblood: '',
        patient_detail: '',
        patient_hos: '',
        patient_hos_la: '',
        patient_hos_long: '',
        patient_province: 'เชียงใหม่',
        region: {
            latitude: '', 
            longitude: '', 
            latitudeDelta: 0.00922, 
            longitudeDelta: 0.00421
        },
    }

      componentWillMount() {
        //console.log('RequestSubmit')
        AsyncStorage.getItem('@RequestData:key')
        .then((result) => {
            //console.log(result);
            const dataRequest = JSON.parse(result)
            this.setState({patient_name : dataRequest.name})
            this.setState({patient_id : dataRequest.patientID})
            this.setState({patient_blood : dataRequest.blood})
            this.setState({patient_blood_type : dataRequest.blood_type})
            this.setState({countblood : dataRequest.bloodUnit})
            this.setState({patient_detail : dataRequest.description})
            this.setState({patient_hos : dataRequest.hostpital})
            this.setState({patient_hos_la : dataRequest.region.latitude.toString()})
            this.setState({patient_hos_long : dataRequest.region.longitude.toString()})
            this.setState({region : { latitude: dataRequest.region.latitude, longitude: dataRequest.region.longitude, latitudeDelta: 0.00922, longitudeDelta: 0.00421}});
           // console.log(this.state)
        })
    }

    render() {
        return(
            <View style={{flex: 1,flexDirection: 'column',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
                <View style={{marginTop:10}}></View>
                <DetailBox 
                    label='ชื่อผู้ป่วย'
                    information='sdfa'
                />
                <DetailBox 
                    label='รหัสผู้ป่วย'
                    information='sdfa'
                />
                <DetailBox 
                    label='กรุ๊ปเลือด'
                    information='sdfa'
                />
                <DetailBox 
                    label='จำนวนเลือดที่ต้องการ'
                    information='sdfa'
                />
                <DetailBox 
                    label='รายละเอียด'
                    information='sdfa'
                />
                <DetailBox 
                    label='จังหวัด'
                    information='sdfa'
                />
                <DetailBox 
                    label='สถานพยาบาล'
                    information='sdfa'
                />
            </View>
            /*<View
                    style={{backgroundColor:'rgba(131, 145, 146,0.7)', flex:1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ backgroundColor:'white', width: 300, height: 300,flexDirection: 'column', justifyContent: 'space-between', }}>
                    <View style={{ paddingTop: 15}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around' , alignItems:'flex-start'}}>
                        <Text>{"ชื่อผู้ป่วย"}</Text>
                        <Text>{this.state.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around' , alignItems:'flex-start'}}>
                        <Text>{"รหัสผู้ป่วย"}</Text>
                        <Text>{this.state.patientID}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around' , alignItems:'flex-start'}}>
                        <Text>{"กรุ๊ปเลือด "}</Text>
                        <Text>{this.state.bloodType}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around' , alignItems:'flex-start'}}>
                        <Text>{"จำนวน(ยูนิต)"}</Text>
                        <Text>{this.state.bloodUnit}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around' , alignItems:'flex-start'}}>
                        <Text>{"รายละเอียด"}</Text>
                        <Text>{this.state.description}</Text>
                        </View><View style={{flexDirection: 'row', justifyContent: 'space-around' , alignItems:'flex-start'}}>
                        <Text>{"สถานพยาบาล"}</Text>
                        <Text>{this.state.hostpital}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around' , alignItems:'flex-start', borderColor: 'black', borderWidth: 1}}>
                        <Button title='Cancel' onPress={() => {
                        this.setConfrimationModalVisible(!this.state.ConfirmationModalVisible)
                        }}/>
                        <Button title='Confirm' onPress={() => {
                        this.setState({confirm: this.state.bloodTypeTemp});
                        this.setConfrimationModalVisible(!this.state.ConfirmationModalVisible)
                        }}/>
                    </View>
                    </View>
                </View>*/
        );
    }

}

const styles = StyleSheet.create({
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
    container: {
        alignSelf: 'center',
    },
    pickerContainer: {
        height: 50,
        marginTop: 10,
        alignSelf: 'center',
        borderColor: '#EEEDEE',
        borderWidth: 1
    },
    request: {
        position: 'absolute',
        //bottom: 0,
        left: 0,
        right: 0,
        top:0
    }
});