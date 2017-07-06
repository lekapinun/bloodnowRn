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
import { TestButton, NavigatorBackground,ExNavigationState, ProfileBox } from '../components/common';
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
      list: {
        title: "test",
        bloodType: "O",
        thumbnail_image: "http://www.japanstyle.info/wordpress/wp-content/images/henohenomoheji.bmp"
      },
    }

    render() {
        return(
            <View style={{marginTop:30}}>
                <Text>Profile SCREEN</Text>
                <ProfileBox
                  list={this.state.list}
                />
            </View>
        );
    }

}
