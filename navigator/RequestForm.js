import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button, Modal } from 'react-native'
import { StackNavigator } from 'react-navigation'
import RequestSubmitScreen from '../screens/Request/RequestBloodSubmitScreen'
import RequestBloodConfirmScreen from '../screens/Request/RequestBloodConfirmScreen'
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons, 
 } from '@expo/vector-icons';
 import Colors from '../constants/Colors';

export default class RequestFormStack extends React.Component {
  render(){
    const RequestFormStack = StackNavigator(
    {
      RequestSubmit : {screen: RequestSubmitScreen},
      RequestConfirm : {screen: RequestBloodConfirmScreen},
    },{
        initialRouteName: 'RequestSubmit',
        mode: 'modal',
        //headerMode: 'float',
    });
    return(
        <Modal 
            animationType={'slide'}
            style={{flex:1,backgroundColor:'transparent'}}
        >
            <RequestFormStack screenProps={this.props.navigation}/>
        </Modal>
    );
    
  }
}

