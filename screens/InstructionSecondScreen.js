import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';
import { Font } from 'expo';
import { BaseButton } from '../components/common/';

export default class InstructionSecondScreen extends Component {
  static navigationOptions = props => {
    return {
      title: "○ ● ○",
      headerTintColor: '#E84A5F',
      gesturesEnabled: true,
      headerTitleStyle: {fontSize: 20, marginBottom: 10},
      headerStyle: {
        justifyContent: 'center',
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      headerRight:
        <TouchableOpacity title="Next" onPress={() => props.navigation.navigate('Instruction3')}>
          <Image style={{ height: 30, width: 30}} source={require('../assets/images/keyboard-right-arrow-button.png')} />
        </TouchableOpacity>,
        headerLeft: <BaseButton
          title='ข้าม'
          fontStyle = {[Font.style('CmPrasanmit'),{fontSize:23,color:'white'}]}
          ButtonStyle = {{backgroundColor: 'transparent', width: 60, height: 40,marginTop:10}}
          onPress={() => props.navigation.navigate('Instruction3')}
          loadColor='white'
        />,
    };
  }
  render() {
    return (
      <View style={{marginTop: 44}}>
        <View style={{ flexDirection: 'row' }}>


          <Text style={{color: '#E84A5F'}}>● ○ ○</Text>
        </View>
      </View>
    );
  }
}
