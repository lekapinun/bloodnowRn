import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import InformationFirstScreen from '../screens/InformationFirstScreen';
import InformationSecondScreen from '../sceens/InformationSecondScreen';
import InformationThirdScreen from '../screens/InformationThirdScreen';

export default class InformationTab extends React.Component {
  render(){
    const InformationTab = TabNavigator(
    {
      Information1 : {screen: InformationFirstScreen},
      Information2 : {screen: InformationSecondScreen},
      Information3 : {screen: InformationThirdScreen},
    },{
        initialRouteName: 'Information1',
        mode: 'screen',
        headerMode: 'float',
        ...TabNavigator.Presets.AndroidTopTabs,
        tabBarOptions:{
          activeTintColor: Colors.tabBar,
          inactiveTintColor: 'grey',
          indicatorStyle: {
            borderBottomColor: Colors.tabBar,
            borderBottomWidth: 3,
          },
          labelStyle: [Font.style('CmPrasanmitBold'),{
            fontSize: 25,
            marginTop: 0
          }],
          style: {
            backgroundColor: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.tabBar,
            height: 40
          },
        }
    });
    return(
      <InformationTab/>
    );

  }
}
