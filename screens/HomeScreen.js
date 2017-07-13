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



export default class HomeScreen extends Component {
    static navigationOptions = props => {
      return {
        tabBarLabel: props.screenProps
      }
    }

    state= {
      test: '',
    }
    componentWillMount() {
      console.log(this.props.navigation.state.params);
      this.setState({test: this.props.navigation.state.params});
    }

    render() {
        return(
            <View style={{marginTop:30, height: 100}}>
              <TouchableOpacity onPress={() => console.log(this.props)}>
                <Text style={{fontSize: 23}}>{this.props.screenProps+ "Group"}</Text>
              </TouchableOpacity>
              </View>
        );
    }

}
