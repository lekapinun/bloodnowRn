import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RequestHistoryScreen from '../screens/RequestBloodHistoryScreen'
import RequestBloodScreen from '../screens/RequestBloodScreen'
import RequestSubmitScreen from '../screens/RequestBloodSubmitScreen'

export default class RequestStack extends React.Component {
  render(){
    const RequestStack = StackNavigator(
    {
      RequestHistory : {screen: RequestHistoryScreen},
      RequestBlood : {screen: RequestBloodScreen},
      RequestSubmit : {screen: RequestSubmitScreen},
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

