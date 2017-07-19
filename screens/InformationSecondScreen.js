import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Font } from 'expo'
import { CmPrasanmitText, CmPrasanmitBoldText } from '../components/';

export default class InformationSecondScreen extends Component {
  static navigationOptions =  {
    title: 'คำแนะนำ2',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  renderList() {
    var customData = require('../constants/InformationQualification.json');
    return customData.map(list =>
      <CardDetail
        key = {list.key}
        list = {list}
        color = {list.key % 2 === 0 ? 'green' : 'white'}
      />
    );
  }

  render() {
    return(
      <ScrollView style={{ paddingBottom: 7}}>
        {this.renderList()}
      </ScrollView>
    );
  }
}

const CardDetail = (props) => {
  return (
    <View style={[styles.cardStyle, {backgroundColor: props.color }]}>
      <Text>{props.list.information}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    width: 350,
    alignSelf: 'center',
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: {width: 2, height: -1},
    shadowOpacity: 0.5,
  },
})
