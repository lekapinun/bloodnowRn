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
import { Font } from 'expo'

import { TestButton, NavigatorBackground,ExNavigationState} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';



export default class RequestBloodHistoryScreenScreen extends Component {
    static navigationOptions =  {
        title: 'ขอเลือด',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
       // headerRight: {/*<ButtonRequest></ButtonRequest>*/}
    };
    /*static route = {
        navigationBar: {
        title: 'เพื่อน',
        backgroundColor: Colors.routeColor,
        titleStyle: [Font.style('CmPrasanmitBold'),{fontSize:25}],
        tintColor: 'white',
        renderRight: () => <ExponentButton />,
        },
    };*/

    render() {
        return(
            <View style={{marginTop:30}}>
                <Text>Re Blood His</Text>
            </View>
        );
    }
}

class ButtonRequest extends Component {
    render(){
        return(
            <View style={{height:20,width:20,backgroundColor:'black'}}></View>
        );
    }
}