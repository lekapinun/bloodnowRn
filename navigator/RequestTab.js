import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RequestHistoryScreen from '../screens/RequestBloodHistoryScreen'
import RequestBloodScreen from '../screens/RequestBloodScreen'

export default class RequestStack extends React.Component {
  render(){
    const RequestStack = StackNavigator(
    {
      RequestHistory : {screen: RequestHistoryScreen},
      RequestBlood : {screen: RequestBloodScreen},
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