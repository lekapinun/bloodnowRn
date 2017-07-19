import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Font } from 'expo'
import Colors from '../constants/Colors'
import { CmPrasanmitText, CmPrasanmitBoldText } from '../components/';

export default class InformationSecondScreen extends Component {
  static navigationOptions =  {
    title: 'คุณสมบัติ',
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
        color = {list.key % 2 === 0 ? '#F8DDE1' : 'white'}
      />
    );
  }

  render() {
    return(
      <ScrollView style={{ flex:1,backgroundColor:'white', paddingVertical:10}}>
        {this.renderList()}
        <CmPrasanmitText style={styles.refText}>อ้างอิงจาก ศูนย์บริการโลหิตแห่งชาติ สภากาชาติไทย, 2553</CmPrasanmitText>
      </ScrollView>
    );
  }
}

const CardDetail = (props) => {
  return (
    <View style={[styles.cardStyle, {backgroundColor: props.color }]}>
      <CmPrasanmitText style={{fontSize:22,color: "#444444",}}>{props.list.information}</CmPrasanmitText>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    width: 350,
    alignSelf: 'center',
    marginTop: 3,
    paddingHorizontal: 15,
    paddingVertical: 7,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    //borderColor: '#F3F3F3',
    //borderWidth: 0.5,
  },
  refText: {
    color:Colors.textgreydetail,
    alignSelf: 'center',
    fontSize: 18,
    marginTop : 10,
    marginBottom : 20
  }
})
