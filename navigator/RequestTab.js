import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RequestHistoryScreen from '../screens/RequestBloodHistoryScreen'
import RequestBloodScreen from '../screens/RequestBloodScreen'
import RequestSubmitScreen from '../screens/RequestBloodSubmitScreen'
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons, 
 } from '@expo/vector-icons';
 import Colors from '../constants/Colors';

export default class RequestStack extends React.Component {
  state = {
    test: 'dsafds'
  }

  static navigationOptions = props => {
    //console.log(props)
    return {
      tabBarIcon: ({ tintColor, focused }) => ( 
        <SimpleLineIcons
          name='heart'
          size={20}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      ),
      //tabBarVisible: false
    }
  }

  
  render(){
    const RequestStack = StackNavigator(
    {
      RequestHistory : {screen: RequestHistoryScreen},
      RequestBlood : {screen: RequestBloodScreen},
      RequestSubmit : {screen: RequestSubmitScreen},
    },{
        initialRouteName: 'RequestHistory',
        mode: 'modal',
        //headerMode: 'float',
    });

    return(
      <RequestStack/>
    );
    
  }
}

