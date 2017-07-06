import React, { Component} from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation'
import axios from 'axios'

import addressServer from '../utilities/addressServer';

import { Button } from '../components/common';

export default class LoginScreen extends Component {

    state = {
        email: '',
        password: '',
        error: false,
        loadRegis: false,
    };

    static navigationOptions = {
        header: null
    };


/*    componentWillMount() {
        //this._checkLogin();
        AsyncStorage.getItem('@loginData:key')
        .then((loginStatus) => {
            if(loginStatus !== null){
                checkLogin = JSON.parse(loginStatus)
                console.log(addressServer.APIRequest.toString() + '/api/index');
                const api = addressServer.APIRequest.toString() + '/api/index';
                axios(api,{ headers: {'Authorization' : 'Bearer ' + checkLogin.token},})
                .then(response => 
                {
                    console.log(response.data)
                    this.saveUserData(response.data)
                    this._goToApp()
                })
                .catch((error) => console.log(error))
            }
        })
    }*/
    

    async _checkLogin() {
      try {
            const loginStatus = await AsyncStorage.getItem('@loginData:key');
            if (loginStatus.uesr !== null) {
                console.log(loginStatus)
                this._goToApp() 
            }
        } catch ( error ) {
            console.log('error');
        }
    }

    async saveUserData(userData) {
        try {
            await AsyncStorage.setItem('@userData:key', JSON.stringify(userData));
        } catch ( error ) {
            console.log('error');
        }
    }

    renderErrorMessage() {
        if(!this.state.error){
            return <Text />
        }
        return <Text style={[Font.style('CmPrasanmit'),{ fontSize: 20,color:'red',}]}>ลองใหม่อีกครั้ง</Text>
    }

    renderRegisButton(){
        if(this.state.loadRegis){
            return <ActivityIndicator size="large" color='#9FAC9B'/>
        } else {
            return(
                <View>
                <View style={{marginTop:10}}></View>
                <Button
                    title='ลงทะเบียน'
                    buttonColor='#9FAC9B'
                    sizeFont={25}
                    onPress={this._register}
                    ButtonWidth={260}
                    ButtonHeight={50}
                    colorFont='white'
                />
                <View style={{marginTop:10}}></View>
                </View>
            );
        }
    }

    render() {
        return(
            <ScrollView style={{flex: 1,flexDirection: 'column', backgroundColor: '#FAFAFA'}}> 
            <View style={{flex: 1,marginTop:80,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
                <Image source={require('../assets/icons/logo.png')} style={{width:190,height:90}}/>
                <View><Text style={[Font.style('CmPrasanmit'),styles.caption]}>ม า ก ก ว่ า ก า ร ใ ห้ เ ลื อ ด</Text></View>
                <View style={{width: 260}}>
                    <TextInput
                        style={[Font.style('CmPrasanmit'),styles.input]}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
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
                    <View style={{height: 30, marginTop:-5,justifyContent: 'flex-start',alignItems: 'flex-end'}}>
                        <TouchableOpacity>
                            <Text style={[Font.style('CmPrasanmit'),{ fontSize: 20,color:'#95989A',}]}>ลืมรหัสผ่าน?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10}}></View>
                    <Button
                        title='เข้าสู่ระบบ'
                        buttonColor='#EF685E'
                        sizeFont={25}
                        onPress={this._loginPress}
                        ButtonWidth={260}
                        ButtonHeight={50}
                        colorFont='white'
                    />
                    <View style={{marginTop:10}}></View>
                    <View style={{justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={[Font.style('CmPrasanmit'),{ fontSize: 23,color:'#95989A',marginBottom:5,marginTop:5}]}>หรือ</Text>
                    </View>
                    {this.renderRegisButton()}
                </View>
            </View> 
            </ScrollView >
        );
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
        console.log(addressServer.APIRequest.toString() + '/api/auth/login');
        const api = addressServer.APIRequest.toString() + '/api/auth/login';
        this.setState({error : false});
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
        var loginData = '';
        fetch(myRequest)
        .then((response) => response.text())
        .then((responseText) => {
            //console.log(JSON.parse(responseText))
            loginData = JSON.parse(responseText);
            if(loginData.status === 'ok'){
                console.log('login success');
                this._loginData(loginData)
                this._goToApp()
            }
            else
            {
                this.setState({ password: '' });
                console.log('login fail');
                this.setState({error : true});
            }
        })
        .catch((error) => {
            console.warn(error);
        }); 
    };

    _goToApp = () => {
        const resetAction = NavigationActions.reset(
            {
                index: 0,
                actions: [ 
                    NavigationActions.navigate({ routeName: 'Bloodnow'})   
                ]
            }
        )
        this.props.navigation.dispatch(resetAction)
    }


    _register = () => {
        /*this.setState({loadRegis: true})
        const { navigate } = this.props.navigation;
        navigate('Register')
        this.setState({loadRegis: false})*/
        const resetAction = NavigationActions.reset(
            {
                index: 1,
                actions: [ 
                    NavigationActions.navigate({ routeName: 'Login'}) ,
                    NavigationActions.navigate({ routeName: 'Register'})   
                ]
            }
        )
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
});
