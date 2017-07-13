import React, { Component, PropTypes } from 'react';
import { Text, ScrollView, StyleSheet, View, Modal, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { NavigatorBackground, Button, RegisterInput, PickerPartTouch, PickerModalDate, PickerModalBlood, PickerModalProvince, ButtonBack } from '../components/common';
import Colors from '../constants/Colors'
import addressServer from '../utilities/addressServer';

export default class RegisterScreen2 extends Component {

  static navigationOptions = props => {
    return {
      title: 'ลงทะเบียน',
      headerTintColor: 'white',
      headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
      headerStyle: {backgroundColor: '#E84A5F'},
      headerLeft: <ButtonBack onPress={() => props.navigation.goBack()} color='white' />,
      gesturesEnabled: false,
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
        firstname: 'โทมัส',
        lastname: 'ฟาวโก้',
        password: '',
        blood: 'A',
        blood_type: '+',
        phone: '',
        email: '',
        province: 'เชียงใหม่',
        birthyear: '2539',
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
        pressGoToRegis3: false,
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    setModalProvinceVisible(visible) {
      this.setState({modalProvinceVisible: visible});
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
      let canSubmit = '00000';
      (this.state.firstname !== '' && this.state.firstname.search(/[^A-Za-zก-๙]/) === -1) ? canSubmit = canSubmit.replaceAt(0,'1') : canSubmit = canSubmit.replaceAt(0,'0');
      (this.state.lastname !== '' && this.state.lastname.search(/[^A-Za-zก-๙]/) === -1) ? canSubmit = canSubmit.replaceAt(1,'1') : canSubmit = canSubmit.replaceAt(1,'0');
      (this.state.blood !== '' && this.state.blood_type !== '') ? canSubmit = canSubmit.replaceAt(2,'1') : canSubmit = canSubmit.replaceAt(2,'0');
      let today = new Date();
      ((parseInt(this.state.birthyear.toString()) > parseInt((today.getFullYear()+443).toString())) && (parseInt(this.state.birthyear.toString()) < parseInt((today.getFullYear()+543).toString()))) ? canSubmit = canSubmit.replaceAt(3,'1') : canSubmit = canSubmit.replaceAt(3,'0');
      (this.state.province !== '') ? canSubmit = canSubmit.replaceAt(4,'1') : canSubmit = canSubmit.replaceAt(4,'0');

      let checkInput = '00000';
      (this.state.firstname !== '') ? checkInput = checkInput.replaceAt(0,'1') : checkInput = checkInput.replaceAt(0,'0');
      (this.state.lastname !== '' ) ? checkInput = checkInput.replaceAt(1,'1') : checkInput = checkInput.replaceAt(1,'0');
      (this.state.blood !== '' ) ? checkInput = checkInput.replaceAt(2,'1') : checkInput = checkInput.replaceAt(2,'0');
      (this.state.birthyear !== '') ? checkInput = checkInput.replaceAt(3,'1') : checkInput = checkInput.replaceAt(3,'0');
      (this.state.province !== '') ? checkInput = checkInput.replaceAt(4,'1') : checkInput = checkInput.replaceAt(4,'0');

      let subValidated = '00000';

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
                <View style={{marginTop: 20}}/>
                <Text style={{color: '#E84A5F'}}>○ ● ○</Text>
                <RegisterInput
                    label='ชื่อ'
                    value={this.state.firstname}
                    onChangeText={(firstname) => this.setState({firstname})}
                    maxLength={30}
                    placeholder='เฉพาะตัวอักษร'
                    validate = {canSubmit.charAt(0) + checkInput.charAt(0) + subValidated.charAt(0)}
                />
                <RegisterInput
                    label='นามสกุล'
                    value={this.state.lastname}
                    onChangeText={(lastname) => this.setState({lastname})}
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
                <View style={{marginTop: 20}}/>
                <View style={{marginVertical:10}}>
                  <Button
                    title='ถัดไป'
                    buttonColor={canSubmit === '11111' ? Colors.tabBar : '#F6B6BF'}
                    sizeFont={25}
                    onPress={canSubmit === '11111' ? this._goToRegis3: null}
                    ButtonWidth={300}
                    ButtonHeight={50}
                    colorFont='white'
                    touchable={canSubmit === '11111' ? this.pressGoToRegis3 : true}
                  />
                </View>
            {/*</View>*/}
        </View>
        </ScrollView>
      );
    }

    _goToRegis3 = () => {
      this.setState({pressGoToRegis3: true})
      const { navigate } = this.props.navigation;
      navigate('Register3')
    }

    _register = () => {
      recent2 = new Date(this.state.date_donate);
      this.state.last_date_donate = recent2.getFullYear().toString() + '-' + (recent2.getMonth()+1).toString() + '-' + recent2.getDate().toString();
      console.log(this.state);
      this.setState({load: true});
      console.log(addressServer.APIRequest.toString() + '/api/auth/register');
      const api = addressServer.APIRequest.toString() + '/api/auth/register';
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
        .then((response) => console.log(response))
        /*.then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
          if(responseText === 'Register Success'){
            userData = this.state
            userData = '{"name":"' + userData.name + '","firstname":"' + userData.firstname + '","lastname":"' + userData.lastname + '","blood":"' + userData.blood + '","blood_type":"' + userData.blood_type + '","phone":"' + userData.phone + '","email":"' + userData.email + '","province":"' + userData.province + '","birthyear":"' + userData.birthyear + '","firstname":"' + userData.last_date_donate +'"}'
            console.log(userData)
            this._setUserData(userData)
            this.setState({modalRegisterVisible: true});
            this.setState({load: false});
          }else{
            console.log('Register Fail');
            this.setState({load: false});
          }
        })*/
        .catch((error) => {
          this.setState({load: false});
          console.log(error);
        });
      }
      else {
        console.log('fail resgister');
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