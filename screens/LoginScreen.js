import React, { Component} from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, AsyncStorage, ScrollView,  Keyboard, Animated, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation'
import axios from 'axios'
import addressServer from '../utilities/addressServer';
import { BaseButton } from '../components/common';
import { CmPrasanmitBoldText, CmPrasanmitText, KeyboardAvoid } from '../components';
import Colors from '../constants/Colors.js'

export default class LoginScreen extends Component {

    state = {
        name: '',
        password: '',
        error: false,
        pressRegis: false,
        pressLogin: false,
        finish: false,
        errorText: '',
    };

    static navigationOptions = {
        header: null
    };

    componentWillMount () {
      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
      this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
      this.positon = new Animated.ValueXY(0,0);
        AsyncStorage.getItem('@loginData:key')
        .then((loginStatus) => {
            if(loginStatus !== null){
                checkLogin = JSON.parse(loginStatus)
                console.log(addressServer.APIRequest.toString() + '/api/user');
                const api = addressServer.APIRequest.toString() + '/api/user';
                axios(api,{ headers: {'Authorization' : 'Bearer ' + checkLogin.token},})
                .then(response =>{
                    console.log(response.data)
                    const resetAction = NavigationActions.navigate({routeName: 'Bloodnow',})
                    this.props.navigation.dispatch(resetAction)
                    //this.props.navigation.navigate('Bloodnow')
                    setTimeout(() => {
                        this.setState({finish: true}) 
                    },500)   
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({finish: true})
                })
            } else {
                this.setState({finish: true})
            }
        })
        .catch((error) => {
            console.log(error)
            this.setState({finish: true})
        })
    }

    componentWillUnmount () {
      this.keyboardWillShowListener.remove();
      this.keyboardWillHideListener.remove();
    }

    _keyboardWillShow = () => {
      this.positon = new Animated.ValueXY({ x: 0, y: 0});
      Animated.timing(this.positon,{
          toValue: { x: 0, y: -100},
      }).start();
      this.forceUpdate();
    }

    _keyboardWillHide = () => {
      this.positon = new Animated.ValueXY({ x: 0, y: -100});
      Animated.timing(this.positon,{
          toValue: { x: 0, y: 0},
      }).start();
      this.forceUpdate();
    }

    async saveUserData(userData) {
        try {
            await AsyncStorage.setItem('@userData:key', JSON.stringify(userData));
        } catch ( error ) {
            console.log('error');
        }
    }

    renderErrorMessage() {
        return this.state.error ? <CmPrasanmitText style={styles.errorText}>{this.state.errorText}</CmPrasanmitText> : null
    }

    render() {
        if(this.state.finish) {
            return(
                <KeyboardAvoid>
                <ScrollView style={{flex: 1,flexDirection: 'column', backgroundColor: '#FAFAFA'}}> 
                <View style={{flex: 1,marginTop:80,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
                    <Image source={require('../assets/icons/logo.png')} style={{width:190,height:90}}/>
                    <CmPrasanmitText style={styles.caption}>ม า ก ก ว่ า ก า ร ใ ห้ เ ลื อ ด</CmPrasanmitText>
                    <View style={{width: 260}}>
                        <TextInput
                            style={[Font.style('CmPrasanmit'),styles.input]}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                            placeholder="ชื่อผู้ใช้หรือเบอร์โทรศัพท์"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TextInput
                            style={[Font.style('CmPrasanmit'),styles.input]}
                            autoCorrect={false}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            placeholder="รหัสผ่าน"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        {this.renderErrorMessage()}
                        <View style={{height: 30, marginTop:5,justifyContent: 'flex-start',alignItems: 'flex-end'}}>
                            <TouchableOpacity>
                                <CmPrasanmitText style={{ fontSize: 20,color:'#95989A'}}>ลืมรหัสผ่าน?</CmPrasanmitText>
                            </TouchableOpacity>
                        </View>
                        <BaseButton
                            title='เข้าสู่ระบบ'
                            fontStyle = {[Font.style('CmPrasanmit'),{fontSize:25,color:'white'}]}
                            ButtonStyle = {{backgroundColor: Colors.buttonLogin, width: 260, height: 50, marginVertical:10}}
                            onPress={this._loginPress}
                            press={this.state.pressLogin}
                        />
                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <CmPrasanmitText style={{ fontSize: 23,color:'#95989A',marginVertical:5}}>หรือ</CmPrasanmitText>
                        </View>
                        <BaseButton
                            title='ลงทะเบียน'
                            fontStyle = {[Font.style('CmPrasanmit'),{fontSize:25,color:'white'}]}
                            ButtonStyle = {{backgroundColor: Colors.buttonRegister, width: 260, height: 50, marginVertical:10}}
                            onPress={this._register}
                            press={this.state.pressRegis}
                        />
                    </View>
                </View> 
                </ScrollView >
                </KeyboardAvoid>
            )
        } else {
            return (
                <View style={{flex:1,backgroundColor:'#FAFAFA',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    async _loginData(loginData){
        try {
            console.log(loginData);
            await AsyncStorage.setItem('@loginData:key', JSON.stringify(loginData));
        } catch ( error ) {
            console.log('error');
        }
    }


    _loginPress = () => {
        this.setState({ pressLogin: true})
        console.log(addressServer.APIRequest.toString() + '/api/auth/login');
        const api = addressServer.APIRequest.toString() + '/api/auth/login';
        this.setState({error : false});
        axios(api,{ method: 'post', data: this.state})
        .then((response) => {
            console.log(response.data)
            //console.log(JSON.parse(responseText))
            loginData = response.data;
            if(loginData.status === 'ok'){
                console.log('login success');
                this._loginData(loginData)
                this._goToApp()
            } else {
                this.setState({ password: '', error : true, pressLogin: false, errorText: 'ลองใหม่อีกครั้ง' });
                console.log('login fail');
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({ error : true, pressLogin: false, errorText: 'กรุณากรอกข้อมูลให้ครบ' });
            console.log('login fail');
            this.setState({error : true});
        }); 
    };

    _goToApp = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [ 
                NavigationActions.navigate({ routeName: 'Bloodnow'})   
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }


    _register = () => {
        this.setState({ pressRegis: true})
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [ 
                NavigationActions.navigate({ routeName: 'Login'}) ,
                NavigationActions.navigate({ routeName: 'Register'})   
            ]
        })
        this.props.navigation.dispatch(resetAction) 
    };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  caption: {
    fontSize: 27,
    color:'#95989A',
    marginBottom:40,
    marginTop:7,
  },
  input: {
    height: 50,
    borderColor: '#EEEDEE',
    borderWidth: 1,
    marginTop:10,
    paddingLeft:10,
    fontSize: 23,
    backgroundColor: 'white',
  },
  errorText: {
    fontSize: 20,
    color:'red'
  }
});