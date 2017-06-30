import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Modal, TouchableOpacity, Picker, StyleSheet,AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { StackNavigation } from '@expo/ex-navigation';
import { Map, InputText, InputTextLarge , PickerPartTouch, PickerModalDate, PickerModalBlood, Button} from '../components/common';
import Colors from '../constants/Colors';
import addressServer from '../utilities/addressServer';

export default class RequestBloodScreen extends Component {
  static route = {
    navigationBar: {
      title: 'คำร้องขอรับบริจาค',
      backgroundColor: Colors.routeColor,
      titleStyle: [Font.style('CmPrasanmitBold'),{fontSize:25}],
      tintColor: 'white',
    },
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
    console.log('RequestSubmit')
    AsyncStorage.getItem('@RequestData:key')
    .then((result) => {
      console.log(result);
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
      console.log(this.state)
    })
  }

  render() {

    return(
      <View style={{marginTop:40}}>
            <Button
              title="ยืนยัน"
              onPress={this._ConfirmRequest}
              buttonColor='#E84A5F'
              sizeFont={25}
              ButtonWidth={300}
              ButtonHeight={50}
              colorFont='white'
            />
      </View>
    );
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
      console.log(responseText)
    })
    .catch((error) => {
      console.log(error)
    })
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
});
