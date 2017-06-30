import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons, 
 } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import FriendScreen from '../screens/FriendScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DonorScreen from '../screens/DonorScreen';
import RequestBloodScreen from '../screens/RequestBloodScreen';
import RequestBloodHistoryScreen from '../screens/RequestBloodHistoryScreen';
import RequestBloodSubmitScreen from '../screens/RequestBloodSubmitScreen';



export default class Tab extends React.Component {
    static navigationOptions = {
        headerLeft: null
    };
  render(){
    const Tab = TabNavigator(
    {
        profile: {screen: ProfileScreen},
        requestbloodhistory: {screen: RequestBloodHistoryScreen},
        donor: {screen: DonorScreen},
        friend: {screen: FriendScreen},
        home: {screen: HomeScreen},
    },{
        ...TabNavigator.Presets.AndroidTopTabs,
        tabBarOptions: {
          //activeTintColor: 'red',
          showLabel: false,
          showIcon: true,
          style: {backgroundColor: 'black'},
          indicatorStyle: { borderBottomColor: Colors.tabIconSelected ,borderBottomWidth: 3},
        },
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
    });

    ProfileScreen.navigationOptions = {
        tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('user', focused)),
    };

    RequestBloodHistoryScreen.navigationOptions = {
        tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('heart', focused)),
    };

    DonorScreen.navigationOptions = {
        tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('drop', focused)),
    };

    FriendScreen.navigationOptions = {
        tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('globe', focused)),
    };

    HomeScreen.navigationOptions = {
        tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('notebook', focused)),
    };

    return(
      <Tab/>
    );
    
  }
    _renderIconSimpleLineIcons(name, focused){
        return (
            <SimpleLineIcons
                name={name}
                size={20}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }
}