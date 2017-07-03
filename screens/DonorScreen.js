import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Font } from 'expo'

export default class DonorScreen extends Component {
    static navigationOptions =  {
        title: 'ให้เลือด',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };
    render() {
        return(
            <ScrollView style={{position: 'relative',bottom: 0}}>
                <Text>Donor SCREEN</Text>

            </ScrollView>
        );
    }

}
