import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Font } from 'expo';
import {CmPrasanmitBoldText} from '../components/CmPrasanmitBoldText';
import {CmPrasanmitText} from '../components/CmPrasanmitText';

export default class ManualDonateScreen extends Component {
  static navigationOptions =  {
    title: 'แก้ไข',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  render() {
    return(
      <View style={{ backgroundColor: 'white'}}>
        <CmPrasanmitBoldText>
          วันบริจาคครั้งล่าสุด
        </CmPrasanmitBoldText>

        <TextInput style={{ width: 300, height: 30, borderBottomWidth: 1, borderBottomColor: 'grey'}} />

        <CmPrasanmitText>
          โปรดทราบ: คุณจะไม่สามารถแก้ไขวันบริจาคล่าสุดในช่วง 3 วันนับจากนี้
        </CmPrasanmitText>
      </View>
    )
  }
}
