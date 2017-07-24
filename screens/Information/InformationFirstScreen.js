import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Font } from 'expo'

export default class InformationFirstScreen extends Component {
    static navigationOptions =  {
        title: 'ขั้นตอน',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };
    render() {
        return(
            <View style={{backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{height: '90%', width: '90%'}}
                  source={require('../../assets/images/step_donate.png')}
                />
            </View>
        );
    }

}
