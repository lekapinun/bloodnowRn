import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class DonorScreen extends Component {
    static navigationOptions =  {
        title: 'ให้เลือด',
    };
    render() {
        return(
            <View style={{marginTop:30}}>
                <Text>Donor SCREEN</Text>
            </View>
        );
    }

}