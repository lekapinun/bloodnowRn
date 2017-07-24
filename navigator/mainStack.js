import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button,AsyncStorage, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/Register/RegisterScreen'
import RegisterScreen2 from '../screens/Register/RegisterScreen2'
import RegisterScreen3 from '../screens/Register/RegisterScreen3'
import Tab from './TabNavigator.js'
import axios from 'axios'
import addressServer from '../utilities/addressServer';
import InstructionTab from './InstructionTab';

export default class Stack extends React.Component {

  componentWillMount() {
    AsyncStorage.getItem('@FirstTime:key')
    .then((response) => {
      console.log(response)
      if(response !== null){
        this.setState({home : 'Login'})
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  state = {
    home: 'Instruction',
    finish: false,
    empty : {}
  }

  render(){
    const Stack = StackNavigator(
    {
      Login : {screen: LoginScreen},
      Register : {screen: RegisterScreen},
      Register2: {screen: RegisterScreen2},
      Register3: {screen: RegisterScreen3},
      Bloodnow : {screen: Tab},
      Instruction: {screen: InstructionTab}
    },{
        initialRouteName: this.state.home,
        mode: 'modal',
        headerMode: 'float',
    });
    return <Stack/>
  }

}
