import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import DonateHistoryScreen from '../screens/DonateHistoryScreen';

export default class ProfileStack extends React.Component {
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
      <ProfileStack/>
    );
  }
}
