import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DonorScreen from '../screens/DonorScreen';


export default class DonorStack extends React.Component {
  render(){
    const DonorStack = StackNavigator(
    {
      Donor : {screen: DonorScreen},
    },{
        initialRouteName: 'Donor',
        mode: 'modal',
        headerMode: 'float',
    });
    return(
      <DonorStack/>
    );
  }
}
