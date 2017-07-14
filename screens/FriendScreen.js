import React, { Component } from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Font } from 'expo'
import { TestButton, NavigatorBackground,ExNavigationState} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import HomeScreen from './HomeScreen';

export default class FriendScreen extends Component {
    static navigationOptions =  {
        title: 'เพื่อน',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };

    render() {
      const FriendTab = TabNavigator(
        {
          ALL: {screen: HomeScreen},
          A: {screen: HomeScreen},
          B: {screen: HomeScreen},
          AB: {screen: HomeScreen},
          O: {screen: HomeScreen},
        },{
          ...TabNavigator.Presets.AndroidTopTabs,
          tabBarOptions:{
            activeTintColor: Colors.tabBar,
            inactiveTintColor: 'grey',
            indicatorStyle: {
              borderBottomColor: Colors.tabBar,
              borderBottomWidth: 2,
            },
            labelStyle: {
              fontSize: 18,
            },
            style: {
              backgroundColor: 'white',
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.tabBar,
            },
          }
        });

        return(
          <FriendTab screenProps="A"/>
        );

      }

}
