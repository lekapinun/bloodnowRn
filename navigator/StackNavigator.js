import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import RegisterScreen2 from '../screens/RegisterScreen2'
import HomeScreen from '../screens/HomeScreen'


export default class Stack extends React.Component {
  render(){
    const Stack = StackNavigator(
    {
      Login : {screen: LoginScreen},
      Register : {screen: RegisterScreen},
      Register2: {screen: RegisterScreen2},
      Home: {screen: HomeScreen},
    },{
        initialRouteName: 'Login',
        mode: 'modal',
        headerMode: 'float',
    });
    return(
      <Stack/>
    );
  }
}
