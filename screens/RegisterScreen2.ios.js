import React, { Component, PropTypes } from 'react';
import { Text, ScrollView, StyleSheet, View, Modal, Image, ActivityIndicator, AsyncStorage } from 'react-native';
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
            renderLeft: () => null,
        },
        style : {
            gettures: null,
        }
    };

    componentWillMount() {
        console.log('Register2')
        AsyncStorage.getItem('@RegisData:key')
        .then((result) => {
          console.log(result);
          const dataRegis1 = JSON.parse(result)
          this.setState({name : dataRegis1.name})
          this.setState({password : dataRegis1.password})
          this.setState({password_confirmation : dataRegis1.password_confirmation})
          this.setState({phone : dataRegis1.phone})
          this.setState({email : dataRegis1.email})
          console.log(this.state)
          AsyncStorage.removeItem('@RegisData:key')
        })
    }



    state = {
        name: '',
        real_name: '',
        real_surname: '',
        password: '',
        blood: '',
        blood_type: '',
        phone: '',
        email: '',
        province: '',
        birthyear: '',
        last_date_donate: '',
        date_donate: '',
        password_confirmation: '',
        blood_typeTemp: '',
        bloodTemp: '',
        provinceTemp: 'กรุงเทพมหานคร',
        date_donateTemp: new Date(),
        modalVisible: false,
        modalDateVisible: false,
        modalRegisterVisible: false,
        modalProvinceVisible: false,
        load: false,
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    setModalDateVisible(visible) {
      this.setState({modalDateVisible: visible});
    }

    setModalProvinceVisible(visible) {
      this.setState({modalProvinceVisible: visible});
    }

    setModalRegisterVisible(visible){
      this.setState({modalProvinceVisible: visible});
    }

    clickOkay(){
      this.setState({modalRegisterVisible: false});
      this.props.navigator.push('rootNavigation');
    }

    render() {
      if(this.state.blood !== ''){
        blood = <Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{this.state.blood + this.state.blood_type }</Text>;
      }else{
        blood = <Text />
      }

      let recentDate;
        if(this.state.date_donate !== ''){
        recent = new Date(this.state.date_donate);
        this.state.date_donateTemp = recent.getFullYear().toString() + '-' + (recent.getMonth()+1).toString() + '-' + recent.getDate().toString();
        recentDate = <Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{this.state.date_donateTemp}</Text>
      }else{
        recentDate = <Text />
      }
      let canSubmit = '000000';
      (this.state.real_name !== '' && this.state.real_name.search(/[^A-Za-zก-๙]/) === -1) ? canSubmit = canSubmit.replaceAt(0,'1') : canSubmit = canSubmit.replaceAt(0,'0');
      (this.state.real_surname !== '' && this.state.real_surname.search(/[^A-Za-zก-๙]/) === -1) ? canSubmit = canSubmit.replaceAt(1,'1') : canSubmit = canSubmit.replaceAt(1,'0');
      (this.state.blood !== '' && this.state.blood_type !== '') ? canSubmit = canSubmit.replaceAt(2,'1') : canSubmit = canSubmit.replaceAt(2,'0');
      let today = new Date();
      ((parseInt(this.state.birthyear.toString()) > parseInt((today.getFullYear()+443).toString())) && (parseInt(this.state.birthyear.toString()) < parseInt((today.getFullYear()+543).toString()))) ? canSubmit = canSubmit.replaceAt(3,'1') : canSubmit = canSubmit.replaceAt(3,'0');
      (this.state.date_donate !== '') ? canSubmit = canSubmit.replaceAt(4,'1') : canSubmit = canSubmit.replaceAt(4,'0');
      (this.state.province !== '') ? canSubmit = canSubmit.replaceAt(5,'1') : canSubmit = canSubmit.replaceAt(5,'0');

      let checkInput = '000000';
      (this.state.real_name !== '') ? checkInput = checkInput.replaceAt(0,'1') : checkInput = checkInput.replaceAt(0,'0');
      (this.state.real_surname !== '' ) ? checkInput = checkInput.replaceAt(1,'1') : checkInput = checkInput.replaceAt(1,'0');
      (this.state.blood !== '' ) ? checkInput = checkInput.replaceAt(2,'1') : checkInput = checkInput.replaceAt(2,'0');
      (this.state.birthyear !== '') ? checkInput = checkInput.replaceAt(3,'1') : checkInput = checkInput.replaceAt(3,'0');
      (this.state.date_donate !== '') ? checkInput = checkInput.replaceAt(4,'1') : checkInput = checkInput.replaceAt(4,'0');
      (this.state.province !== '') ? checkInput = checkInput.replaceAt(5,'1') : checkInput = checkInput.replaceAt(5,'0');

      let subValidated = '000000';

      if(canSubmit === '111111'){
        ButtonSubmit = 
          <Button
            title='เสร็จสิ้น'
            buttonColor='#E84A5F'
            sizeFont={25}
            onPress={this._register}
            ButtonWidth={300}
            ButtonHeight={50}
            colorFont='white'
          />
      }else{
        ButtonSubmit = 
          <Button
            touchable={true}
            title='เสร็จสิ้น'
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
            <ModalRegister
                  pickerVisible = {this.state.modalRegisterVisible}
                  onPress = { () => this.clickOkay() }
            >
            </ModalRegister>
            <PickerModalProvince
                pickerVisible = {this.state.modalProvinceVisible}
                onPressCancel = {() => { this.setModalProvinceVisible(!this.state.modalProvinceVisible) }}
                onPressSubmit = {() => {
                    this.setState({province: this.state.provinceTemp});
                    this.setModalProvinceVisible(!this.state.modalProvinceVisible);
                }}
                selectOne = {this.state.provinceTemp}
                onChangeOne = {(itemValue, itemIndex) => this.setState({provinceTemp: itemValue}) }
            />
            <PickerModalBlood
                pickerVisible = {this.state.modalVisible}
                onPressCancel = {() => { this.setModalVisible(!this.state.modalVisible)}}
                onPressSubmit = {() => {
                    if(this.state.bloodTemp === ''){
                      this.setState({blood: 'A'});
                    }else{
                      this.setState({blood: this.state.bloodTemp});
                    }  
                    if(this.state.blood_typeTemp === ''){
                      this.setState({blood_type: '+'});
                    }else{
                      this.setState({blood_type: this.state.blood_typeTemp});
                    }          
                    this.setModalVisible(!this.state.modalVisible);
                }}
                selectOne = {this.state.bloodTemp}
                onChangeOne = {(itemValue, itemIndex) => this.setState({bloodTemp: itemValue})}
                selectTwo = {this.state.blood_typeTemp}
                onChangeTwo = {(itemValue2, itemIndex2) => this.setState({blood_typeTemp: itemValue2})}
            />
            <PickerModalDate
                pickerVisible = {this.state.modalDateVisible}
                onPressCancel = {() => { this.setModalDateVisible(!this.state.modalDateVisible) }}
                onPressSubmit = {() => {
                    this.setState({date_donate: this.state.date_donateTemp});
                    this.setModalDateVisible(!this.state.modalDateVisible);
                }}
                selectOne = {this.state.date_donateTemp}
                onChangeOne = {date => this.setState({ date_donateTemp: date })}
            />
                <View style={{marginTop: 20}}/>
                <Text style={{color: '#E84A5F'}}>○ ●</Text>
                <RegisterInput
                    label='ชื่อ'
                    value={this.state.real_name}
                    onChangeText={(real_name) => this.setState({real_name})}
                    maxLength={30}
                    placeholder='เฉพาะตัวอักษร'
                    validate = {canSubmit.charAt(0) + checkInput.charAt(0) + subValidated.charAt(0)}
                />
                <RegisterInput
                    label='นามสกุล'
                    value={this.state.real_surname}
                    onChangeText={(real_surname) => this.setState({real_surname})}
                    maxLength={30}
                    placeholder='เฉพาะตัวอักษร'
                    validate = {canSubmit.charAt(1) + checkInput.charAt(1) + subValidated.charAt(1)}
                />
                <PickerPartTouch
                    label='กรุ๊ปเลือด'
                    onPress={() => this.setModalVisible(true)}
                    information={blood}
                />
                <PickerPartTouch
                    label='จังหวัด'
                    onPress={() => this.setModalProvinceVisible(true)}
                    information={<Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{this.state.province}</Text>}
                />
                <RegisterInput
                    label='ปีเกิด(พ.ศ.)'
                    value={this.state.birthyear}
                    onChangeText={(birthyear) => this.setState({birthyear})}
                    keyboardType='numeric'
                    maxLength={4}
                    validate = {canSubmit.charAt(3) + checkInput.charAt(3) + + subValidated.charAt(3)}
                />
                <PickerPartTouch
                    label='บริจาคครั้งล่าสุด'
                    onPress={() => { this.setModalDateVisible(true) }}
                    information={recentDate}
                />
                <View style={{marginTop: 20}}/>
                {ButtonSubmit}
            {/*</View>*/}
        </View>
        </ScrollView>
      );
    }

    _register = () => {
      recent2 = new Date(this.state.date_donate);
      this.state.last_date_donate = recent2.getFullYear().toString() + '-' + (recent2.getMonth()+1).toString() + '-' + recent2.getDate().toString();
      console.log(this.state);
      this.setState({load: true});
      console.log(addressServer.IPMac.toString() + '/register');
      const api = addressServer.IPMac.toString() + '/register';
      if( this.state.password === this.state.password_confirmation){
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
        var userData = '';
        fetch(myRequest)
        .then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
          if(responseText === 'Register Success'){
            userData = this.state
            userData = '{"name":"' + userData.name + '","real_name":"' + userData.real_name + '","real_surname":"' + userData.real_surname + '","blood":"' + userData.blood + '","blood_type":"' + userData.blood_type + '","phone":"' + userData.phone + '","email":"' + userData.email + '","province":"' + userData.province + '","birthyear":"' + userData.birthyear + '","real_name":"' + userData.last_date_donate +'"}'
            console.log(userData)
            this._setUserData(userData)
            this.setState({modalRegisterVisible: true});
            this.setState({load: false});
          }else{
            console.log('Register Fail');
            this.setState({load: false});
          }
        })
        .catch((error) => {
          this.setState({load: false});
          console.log(error);
        });
      }
      else {
        console.log('fail resgister');
      }
    }

    async _setUserData(userData) {
      try {
        await AsyncStorage.setItem('@userData:key', userData);
      }catch ( error ) {
        console.log(error);
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

const ModalRegister = ({pickerVisible,onPress}) => {
  return(
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={pickerVisible}
      >
        <View style={[styles.container,{flex:1,backgroundColor:'rgba(52, 52, 52, 0.3)'}]}>
          <View style={{paddingTop:25,alignItems: 'center',height:190,width:220,backgroundColor:'white'}}>
            <Image source={require('../assets/icons/cr.png')} style={{height:70,width:70}}/>
            <Text style={[Font.style('CmPrasanmitBold'),{paddingTop:5,fontSize:27,color: '#4ED239'}]}>ลงทะเบียนสำเร็จ</Text>
            <View style={{borderBottomColor: '#B2ECA9', width:200, marginTop:20,borderBottomWidth: 1,}}/>
            <View>
              <Button
                onPress={onPress}
                buttonColor='white'
                title='ตกลง'
                sizeFont={20}
                ButtonWidth={200}
                colorFont='#898989'
              />
            </View> 
          </View>
        </View>
      </Modal>
  );
}

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}