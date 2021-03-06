import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Font } from 'expo'
import { CmPrasanmitBoldText, CmPrasanmitText } from '../../components/';
import Colors from '../../constants/Colors'

export default class InformationThirdScreen extends Component {
    static navigationOptions =  {
        title: 'การเตรียมตัว',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };

    renderSection() {
      var customData = require('../../constants/InformationPrepare.json');
      return customData.map(list =>
        <Section
          key = {list.step}
          list = {list}
        />
      );
    }

    render() {
      return(
        <ScrollView style={{ backgroundColor: 'white', paddingBottom: 7}}>
          {this.renderSection()}
          <CmPrasanmitText style={styles.refText}>อ้างอิงจาก ศูนย์บริการโลหิตแห่งชาติ สภากาชาติไทย, 2553</CmPrasanmitText>
        </ScrollView>
      );
    }
  }

  const Section = (props) => {
    return (
      <View>
        <View style={styles.sectionStyle}>
          <CmPrasanmitText style={{ marginVertical: 5,alignSelf: 'center', color: "white", fontSize: 23 }}>
            {props.list.title}
          </CmPrasanmitText>
        </View>
        {props.list.information.map( item =>
          <CardDetail
            key = {item.key}
            information = {item.detail}
          />
        )}
      </View>
    );
  }

  const CardDetail = (props) => {
    return (
      <View style={styles.cardStyle}>
        <CmPrasanmitText style={{ marginVertical: 3, color: "#444444", fontSize: 22}}>{props.information}</CmPrasanmitText>
      </View>
    );
  }

  const styles = StyleSheet.create({
    sectionStyle: {
      width: 350,
      alignSelf: 'center',
      marginTop: 15,
      backgroundColor: "#FFAC3F",
    },
    cardStyle: {
      width: 350,
      alignSelf: 'center',
      marginTop: 3,
      paddingHorizontal: 15,
      paddingVertical: 7,
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.5,
    },
    refText: {
      color:Colors.textgreydetail,
      alignSelf: 'center',
      fontSize: 18,
      marginTop : 10,
      marginBottom : 20
    }
  })
