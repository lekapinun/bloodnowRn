import React, { Component, PropTypes } from 'react';
import { Text, ScrollView, StyleSheet, View, Modal, Image, ActivityIndicator,AsyncStorage,Keyboard, Animated  } from 'react-native';
import { Font } from 'expo';
import { NavigatorBackground, Button, RegisterInput } from '../../components/common';
import { NavigationActions } from 'react-navigation'
import axios from 'axios'
import Colors from '../../constants/Colors'
import addressServer from '../../utilities/addressServer';

export default class RegisterScreen extends Component {

  static navigationOptions = {
    title: 'ลงทะเบียน',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  componentWillMount () {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
    this.positon = new Animated.ValueXY(0,0);
  }

  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow = () => {
    this.positon = new Animated.ValueXY({ x: 0, y: 0});
    Animated.timing(this.positon,{
      toValue: { x: 0, y: this.state.avoid},
    }).start();
    this.forceUpdate();
  }

  _keyboardWillHide = () => {
    this.positon = new Animated.ValueXY({ x: 0, y: this.state.avoid});
    Animated.timing(this.positon,{
      toValue: { x: 0, y: 0},
    }).start();
    this.forceUpdate();
  }

    state = {
        name: '',
        password: '',
        password_confirmation: '',
        phone: '',
        email: '',
        subValidated: '00000',
        pressGotoRegis2: false,
        avoid: -50,
    }


    render() {
      let canSubmit = '00000';
      (this.state.name !== '' && this.state.name.search(/[^A-Za-z]/) === -1) ? canSubmit = canSubmit.replaceAt(0,'1') : canSubmit = canSubmit.replaceAt(0,'0') ;
      (this.state.password === this.state.password_confirmation && this.state.password !== '' && this.state.password_confirmation !== '') ? canSubmit = canSubmit.replaceAt(2,'1') : canSubmit = canSubmit.replaceAt(2,'0');
      (this.state.password !== '' && this.state.password.length > 5) ? canSubmit = canSubmit.replaceAt(1,'1') : canSubmit = canSubmit.replaceAt(1,'0');
      (this.state.phone !== '' && this.state.phone.search(/[^0-9]/) === -1) ? canSubmit = canSubmit.replaceAt(3,'1') : canSubmit = canSubmit.replaceAt(3,'0') ;
      (this.state.email !== '' && this.state.email.search("@") !== -1 ) ? canSubmit = canSubmit.replaceAt(4,'1') : canSubmit = canSubmit.replaceAt(4,'0') ;
      let checkInput = '00000';
      (this.state.name !== '') ? checkInput = checkInput.replaceAt(0,'1') : checkInput = checkInput.replaceAt(0,'0') ;
      (this.state.password !== '' ) ? checkInput = checkInput.replaceAt(1,'1') : checkInput = checkInput.replaceAt(1,'0');
      (this.state.password_confirmation !== '' ) ? checkInput = checkInput.replaceAt(2,'1') : checkInput = checkInput.replaceAt(2,'0');
      (this.state.phone !== '' ) ? checkInput = checkInput.replaceAt(3,'1') : checkInput = checkInput.replaceAt(3,'0') ;
      (this.state.email !== '' ) ? checkInput = checkInput.replaceAt(4,'1') : checkInput = checkInput.replaceAt(4,'0') ;

      return(
        <View style={{backgroundColor:'#FAFAFA',flex:1}}>
        <Animated.View style={[this.positon.getLayout(),{flex:1}]} >
        <ScrollView style={{flex: 1,flexDirection: 'column', backgroundColor: '#FAFAFA'}}>       
        <View style={{flex: 1,flexDirection: 'column',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
          <View style={{marginTop: 20}}/>
          <Text style={{color: '#E84A5F'}}>● ○ ○</Text>
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
            onFocus={() => this.setState({avoid: 0})}
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
            onFocus={() => this.setState({avoid: 0})}
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
            onFocus={() => this.setState({avoid: 0})}
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
            subvalidate = 'อีเมลล์นี้มีอยู่แล้วหรือไม่ถูกต้อง'
            onFocus={() => this.setState({avoid: -130})}
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
            onFocus={() => this.setState({avoid: -130})}
          />
          <View style={{marginTop: 20}}/>
          <View style={{marginVertical:10}}>
            <Button
              title='ถัดไป'
              buttonColor={canSubmit.search("0") === -1 ? Colors.tabBar : '#F6B6BF'}
              sizeFont={25}
              onPress={canSubmit.search("0") === -1 ? this._goToRegister2: null}
              ButtonWidth={300}
              ButtonHeight={50}
              colorFont='white'
              touchable={canSubmit.search("0") === -1 ? this.state.pressGotoRegis2 : true}
            />
          </View>
        </View>
        </ScrollView>
        </Animated.View>
        </View>
      );
    }
    
    _goToRegister2 = () => {
      this.setState({pressGotoRegis2 : true})
      console.log(this.state);
      console.log(addressServer.APIRequest.toString() + '/api/auth/check');
      const api = addressServer.APIRequest.toString() + '/api/auth/check';
      axios(api, { method: 'post', data : this.state })
        .then(response => {
          console.log(response.data)
          if( response.data !== 'ok'){
            if( response.data.name !== undefined){
              this.setState({subValidated: this.state.subValidated.replaceAt(0,'1')})
            }
            if( response.data.email !== undefined){
              this.setState({subValidated: this.state.subValidated.replaceAt(4,'1')})
            }
            if( response.data.phone !== undefined){
              this.setState({subValidated: this.state.subValidated.replaceAt(3,'1')})
            }
            this.setState({pressGotoRegis2 : false})
          } else {
            AsyncStorage.setItem('@RegisData:key', JSON.stringify(this.state))
            .then((response) => {
              console.log(response)
              const { navigate } = this.props.navigation;
              navigate('Register2')
              this.setState({pressGotoRegis2 : false})
            })
            .catch((error) => {
              console.log(error);
            });
          }
        })
        .catch((error) => {
            console.log(error)
        })
    };

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