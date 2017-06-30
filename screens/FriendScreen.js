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



export default class FriendScreen extends Component {

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
                <Text>FRIENDS SCREEN</Text>
            </View>
        );
    }

}