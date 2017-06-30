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

import { withNavigation } from '@expo/ex-navigation';
import { TestButton, NavigatorBackground,ExNavigationState} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

@withNavigation class ExponentButton extends Component {
  _handlePress = () => {
    this.props.navigator.push('requestBlood');
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this._handlePress}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          paddingTop: 1,
        }}>
        <Image
          source={require('../assets/icons/exponent-icon.png')}
          style={{ width: 21, height: 17 }}
        />
      </TouchableOpacity>
    );
  }
}

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