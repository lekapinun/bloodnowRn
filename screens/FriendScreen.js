import React, { Component } from 'react';
import {
  Image,
  Linking,
  Platform,
  FlatList,
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
    static navigationOptions =  {
        title: 'เพื่อน',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };

    render() {
        return(
            <View style={{marginTop:30}}>
                <FlatList

                />

            </View>
        );
    }

}
