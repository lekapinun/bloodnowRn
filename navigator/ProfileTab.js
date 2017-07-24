import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import DonateHistoryScreen from '../screens/Profile/DonateHistoryScreen';

export default class ProfileStack extends React.Component {
  componentWillMount() {
    /* console.log('1111111111111')
    console.log(this.props)
    console.log('1111111111111') */
  }
  render(){
    const ProfileStack = StackNavigator(
    {
      Profile : {screen: ProfileScreen},
      EditProfile: {screen: EditProfileScreen},
      DonateHistory: {screen: DonateHistoryScreen},
    },{
        initialRouteName: 'Profile',
        mode: 'modal',
        headerMode: 'float',
    });
    return(
      <ProfileStack screenProps={this.props.screenProps}/>
    );
  }
}
