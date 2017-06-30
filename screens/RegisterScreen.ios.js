import React, { Component, PropTypes } from 'react';
import { Text, ScrollView, StyleSheet, View, Modal, Image, ActivityIndicator,AsyncStorage } from 'react-native';
import { Font } from 'expo';
import DatePicker from 'react-native-datepicker';
import { NavigatorBackground, Button, RegisterInput, PickerPartTouch, PickerModalDate, PickerModalBlood, PickerModalProvince } from '../components/common';

import addressServer from '../utilities/addressServer';

export default class RegisterScreen extends Component {

    static route = {
        navigationBar: { 
            title: 'ลงทะเบียน',
            backgroundColor: '#E84A5F',
            titleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
            tintColor: 'white',
        },
        style : {
            gettures: null,
        }
    };

    state = {
        name: '',
        password: '',
        password_confirmation: '',
        phone: '',
        email: '',
        subValidated: '00000'
    }


    render() {
      let canSubmit = '00000';
      (this.state.name !== '' && this.state.name.search(/[^A-Za-z]/) === -1) ? canSubmit = canSubmit.replaceAt(0,'1') : canSubmit = canSubmit.replaceAt(0,'0') ;
      (this.state.password === this.state.password_confirmation && this.state.password !== '' && this.state.password_confirmation !== '') ? canSubmit = canSubmit.replaceAt(2,'1') : canSubmit = canSubmit.replaceAt(2,'0');
      (this.state.password !== '' && this.state.password.length > 5) ? canSubmit = canSubmit.replaceAt(1,'1') : canSubmit = canSubmit.replaceAt(1,'0');
      (this.state.phone !== '' && this.state.phone.search(/[^0-9]/) === -1) ? canSubmit = canSubmit.replaceAt(3,'1') : canSubmit = canSubmit.replaceAt(3,'0') ;
      (this.state.email !== '' && this.state.email.search("@") !== -1 && this.state.email.search(".com") !== -1) ? canSubmit = canSubmit.replaceAt(4,'1') : canSubmit = canSubmit.replaceAt(4,'0') ;
      let checkInput = '00000';
      (this.state.name !== '') ? checkInput = checkInput.replaceAt(0,'1') : checkInput = checkInput.replaceAt(0,'0') ;
      (this.state.password !== '' ) ? checkInput = checkInput.replaceAt(1,'1') : checkInput = checkInput.replaceAt(1,'0');
      (this.state.password_confirmation !== '' ) ? checkInput = checkInput.replaceAt(2,'1') : checkInput = checkInput.replaceAt(2,'0');
      (this.state.phone !== '' ) ? checkInput = checkInput.replaceAt(3,'1') : checkInput = checkInput.replaceAt(3,'0') ;
      (this.state.email !== '' ) ? checkInput = checkInput.replaceAt(4,'1') : checkInput = checkInput.replaceAt(4,'0') ;
      if(canSubmit.search("0") === -1){
        ButtonSubmit = 
          <Button
            title='ถัดไป'
            buttonColor='#E84A5F'
            sizeFont={25}
            onPress={this._goToRegister2}
            ButtonWidth={300}
            ButtonHeight={50}
            colorFont='white'
          />;
      }else{
        ButtonSubmit = 
          <Button
            touchable={true}
            title='ถัดไป'
            buttonColor='#F6B6BF'
            sizeFont={25}
            onPress={() => {}}
            ButtonWidth={300}
            ButtonHeight={50}
            colorFont='white'
          />;
      }

      return(
        <ScrollView style={{flex: 1,flexDirection: 'column', backgroundColor: '#FAFAFA'}}>       
        <View style={{flex: 1,flexDirection: 'column',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
          <View style={{marginTop: 20}}/>
          <Text style={{color: '#E84A5F'}}>● ○</Text>
          <RegisterInput
            label='ชื่อผู้ใช้'
            value={this.state.name}
            onChangeText={(name) => {
              this.setState({name})
              this.setState({subValidated : this.state.subValidated.replaceAt(0,'0')})
            }}
            maxLength={20}
            placeholder='เฉพาะตัวอักษร'
            validate = {canSubmit.charAt(0) + checkInput.charAt(0) + this.state.subValidated.charAt(0)}
            subvalidate = 'ชื่อผู้ใช้มีอยู่แล้ว'
          />
          <RegisterInput
            label='รหัสผ่าน'
            value={this.state.password}
            onChangeText={(password) => {
              this.setState({password})
              this.setState({subValidated : this.state.subValidated.replaceAt(1,'0')})
            }}
            secureTextEntry={true}
            maxLength={30}
            placeholder='อย่างน้อย 6 ตัว'
            validate = {canSubmit.charAt(1) + checkInput.charAt(1) + this.state.subValidated.charAt(1)}
          />
          <RegisterInput
            label='ยืนยันรหัสผ่าน'
            value={this.state.password_confirmation}
            onChangeText={(password_confirmation) => {
              this.setState({password_confirmation})
              this.setState({subValidated : this.state.subValidated.replaceAt(2,'0')})
            }}
            secureTextEntry={true}
            maxLength={20}
            validate = {canSubmit.charAt(2) + checkInput.charAt(2) + this.state.subValidated.charAt(2)}
          />
          <RegisterInput
            label='อีเมลล์'
            value={this.state.email}
            onChangeText={(email) => {
              this.setState({email})
              this.setState({subValidated : this.state.subValidated.replaceAt(4,'0')})
            }}
            keyboardType='email-address'
            maxLength={30}
            validate = {canSubmit.charAt(4) + checkInput.charAt(4) + this.state.subValidated.charAt(4)}
            placeholder='address@example.com'
            subvalidate = 'อีเมลล์นี้มีอยู่แล้ว'
          />
          <RegisterInput
            label='เบอร์โทรศัพท์'
            value={this.state.phone}
            onChangeText={(phone) => {
              this.setState({phone})
              this.setState({subValidated : this.state.subValidated.replaceAt(3,'0')})
            }}
            keyboardType='number-pad'
            maxLength={10}
            validate = {canSubmit.charAt(3) + checkInput.charAt(3) + this.state.subValidated.charAt(3)}
            subvalidate = 'เบอร์โทรศัพท์นี้มีอยู่แล้ว'
          />
          <View style={{marginTop: 20}}/>
          {ButtonSubmit}
        </View>
        </ScrollView>
      );
    }
    
    _goToRegister2 = () => {
      console.log(this.state);
      console.log(addressServer.IPMac.toString() + '/checkregis');
      const api = addressServer.IPMac.toString() + '/checkregis';
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
          if(responseText.length > 0){
            console.log('fail')
            if(responseText.search('The name has already been taken.') !== -1){
              this.setState({subValidated: this.state.subValidated.replaceAt(0,'1')})
            }
            if(responseText.search('The email has already been taken.') !== -1){
              this.setState({subValidated: this.state.subValidated.replaceAt(4,'1')})
            }
            if(responseText.search('The phone has already been taken.') !== -1){
              this.setState({subValidated: this.state.subValidated.replaceAt(3,'1')})
            }
          } else {
            AsyncStorage.setItem('@RegisData:key', JSON.stringify(this.state))
            .then(() => {
              this.props.navigator.push('register2');
            })
            .catch((error) => {
              console.log(error);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    async _register1(){
      try {

      } catch (error) {
        
      }
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerText: {
    paddingLeft:10,
    fontSize: 25,
  }
});

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}