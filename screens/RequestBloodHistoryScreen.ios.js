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

class ButtonRequest extends Component {
    _handlePress = () => {
        console.log(this.props);
        /*//const { navigate } = this.props.navigation;
        navigate('RequestBlood')*/
    };
    render(){
        return(
            <TouchableOpacity 
                onPress={this._handlePress}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 10, paddingTop: 1,}}
            >
                <Image
                    source={require('../assets/icons/exponent-icon.png')}
                    style={{ width: 21, height: 17 }}
                />
            </TouchableOpacity>
        );
    }
}

export default class RequestBloodHistoryScreen extends Component {
    static navigationOptions =  {
        title: 'ขอเลือด',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
        headerRight: <ButtonRequest />
    };

    render() {
        return(
            <View style={{marginTop:30}}>
                <Text>Re Blood His</Text>
            </View>
        );
    }
}
