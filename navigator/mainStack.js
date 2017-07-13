import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button,AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import RegisterScreen2 from '../screens/RegisterScreen2'
import Tab from './TabNavigator.js'
import axios from 'axios'
import addressServer from '../utilities/addressServer';

export default class Stack extends React.Component {

  componentWillMount() {
    //this._checkLogin();
    AsyncStorage.getItem('@loginData:key')
    .then((loginStatus) => {
    //console.log(loginStatus)
      if(loginStatus !== null){
        checkLogin = JSON.parse(loginStatus)
        //console.log(checkLogin)
        console.log(addressServer.APIRequest.toString() + '/api/index');
        const api = addressServer.APIRequest.toString() + '/api/index';
        axios(api,{ headers: {'Authorization' : 'Bearer ' + checkLogin.token},})
        .then(response =>
        {
          console.log(response.data)
          //this.saveUserData(response.data)
          this.setState({home: 'Bloodnow'})
          this.setState({finish: true})
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
    })
  }

  state = {
    home: 'Login',
    finish: false
  }

  render(){
    const Stack = StackNavigator(
    {
      Login : {screen: LoginScreen},
      Register : {screen: RegisterScreen},
      Register2: {screen: RegisterScreen2},
      Bloodnow : {screen: Tab},
    },{
        initialRouteName: this.state.home,
        mode: 'modal',
        headerMode: 'float',
    });
    if(this.state.finish){
      return <Stack/>
    }else {
      return <Text>asdfadsfsad</Text>//<Expo.AppLoading />
    }
  }
}
