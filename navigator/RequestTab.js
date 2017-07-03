import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RequestHistoryScreen from '../screens/RequestBloodHistoryScreen'


export default class RequestStack extends React.Component {
  render(){
    const RequestStack = StackNavigator(
    {
      RequestHistory : {screen: RequestHistoryScreen},
    },{
        initialRouteName: 'RequestHistory',
        mode: 'modal',
        headerMode: 'float',
    });
    return(
      <RequestStack/>
    );
  }
}