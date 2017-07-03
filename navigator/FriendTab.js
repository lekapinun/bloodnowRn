import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import FriendScreen from '../screens/FriendScreen'


export default class FriendStack extends React.Component {
  render(){
    const FriendStack = StackNavigator(
    {
      Friend : {screen: FriendScreen},
    },{
        initialRouteName: 'Friend',
        mode: 'modal',
        headerMode: 'float',
    });
    return(
      <FriendStack/>
    );
  }
}