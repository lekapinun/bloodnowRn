import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import InformationScreen from '../screens/InformationScreen'


export default class InformationStack extends React.Component {
  render(){
    const InformationStack = StackNavigator(
    {
      Information : {screen: InformationScreen},
    },{
        initialRouteName: 'Information',
        mode: 'modal',
        headerMode: 'float',
    });
    return(
      <InformationStack/>
    );
  }
}