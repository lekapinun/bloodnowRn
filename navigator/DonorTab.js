import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DonorScreen from '../screens/Donor/DonorScreen';
import RequestDetailInDonorScreen from '../screens/Donor/RequestDetailInDonorScreen';
import ManualDonateScreen from '../screens/Donor/ManualDonateScreen';

export default class DonorStack extends React.Component {
  componentWillMount(){
    /* console.log('111111111')
    console.log(this.props) */
  }

  render(){
    const DonorStack = StackNavigator(
    {
      Donor : {screen: DonorScreen},
      RequestInDonor: {screen: RequestDetailInDonorScreen},
      ManualDonate: {screen: ManualDonateScreen},
    },{
        initialRouteName: 'Donor',
        mode: 'modal',
        headerMode: 'float',
    });
    return(
      <DonorStack screenProps={this.props}/>
    );
  }
}
