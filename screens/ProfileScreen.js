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



export default class ProfileScreen extends Component {
    static navigationOptions =  {
        title: 'โปรไฟล์',
        //headerBackTitle: 'โปรไฟล์',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };

    state = {
        test : new Date('2017-07-13T04:13:00.714Z').getTime() - new Date().getTime(),
        test2 : 10
    }

    ComponentWillMount() {

    }

    constructor(props) {
        super(props);
        console.log(props)
        setInterval(() => {
            this.setState({test : this.state.test - 60000})
            //console.log( (this.state.test/60000).toString() + ' ' + (this.state.test%60000).toString())
            //console.log(this.state)
        }, 60000);
    }

    rendertime = () => {
        return (
            <Text>{ (Math.floor(this.state.test/(3600000*24))).toString() + ' ' + (Math.floor(this.state.test/3600000)).toString() + ' ' + (Math.floor(this.state.test/60000)).toString() + ' ' + (this.state.test%60000).toString()}</Text>
        );
    }

    render() {
        return(
            <View style={{marginTop:30}}>
                {this.rendertime()}
            </View>
        );
    }

}