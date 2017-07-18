import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import InformationFirstScreen from '../screens/InformationFirstScreen';
import InformationSecondScreen from '../screens/InformationSecondScreen';
import InformationThirdScreen from '../screens/InformationThirdScreen';

export default class InformationTab extends React.Component {

  render(){
    const InformationTab = StackNavigator({
        MyTab: {
          screen: TabNavigator({
            Information1 : {screen: InformationFirstScreen},
            Information2 : {screen: InformationSecondScreen},
            Information3 : {screen: InformationThirdScreen},
          },{
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
          }),
        navigationOptions:  {
            title: 'คำแนะนำ',
            headerTintColor: 'white',
            headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
            headerStyle: {backgroundColor: '#E84A5F'},
            gesturesEnabled: false,
          }
        }
      });
    return(
      <InformationTab />
    );

  }
}
