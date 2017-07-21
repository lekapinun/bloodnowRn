import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Font } from 'expo';
import { BaseButton } from '../components/common/';
import { CmPrasanmitBoldText, CmPrasanmitText } from '../components';

export default class InstructionThirdScreen extends Component {
  static navigationOptions = props => {
    return {
      title: "○ ○ ●",
      headerTintColor: '#E84A5F',
      gesturesEnabled: true,
      headerTitleStyle: {fontSize: 20, marginBottom: 20},
      headerStyle: {
        justifyContent: 'center',
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: {width: 2, height: -1},
        shadowOpacity: 0.5,
      },
      headerRight:
      <TouchableOpacity onPress={() => props.screenProps.rootNavigation.navigate('Login') } >
        <Image style={{ height: 30, width: 30, marginBottom: 15}} source={require('../assets/images/keyboard-right-arrow-button.png')} />
      </TouchableOpacity>,
    }
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          style={styles.imageBox}
          source={require('../assets/images/intro2v6.png')}
        />

        <CmPrasanmitBoldText style={styles.descriptionHeader}>
          ตรวจสอบความพร้อม
        </CmPrasanmitBoldText>

        <View style={styles.descriptionContainer}>
          <CmPrasanmitText style={styles.descriptionText}>
            นับถอยหลังวันบริจาค,
          </CmPrasanmitText>
          <CmPrasanmitText style={styles.descriptionText}>
            แก้ไขความพร้อมในการให้เลือด
          </CmPrasanmitText>
          <CmPrasanmitText style={styles.descriptionText}>
            และกดดูคำร้องที่ขอเข้ามา
          </CmPrasanmitText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBox: {
    height: 320,
    width: 320,
    borderRadius: 160,
    alignSelf: 'center',
    marginTop: 35,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  descriptionHeader: {
    alignSelf: 'center',
    fontSize: 45,
    marginTop: 50,
    color: '#575757',
  },
  descriptionText: {
    fontSize: 25,
    color:'#575757',
  }
})
