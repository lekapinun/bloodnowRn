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
import { CmPrasanmitBoldText, CmPrasanmitText } from '../components';

export default class InstructionSecondScreen extends Component {
  static navigationOptions = props => {
    return {
      title: "○ ● ○",
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
      <TouchableOpacity onPress={() => props.navigation.navigate('Instruction3')}>
        <Image style={{ height: 30, width: 30, marginBottom: 15}} source={require('../assets/images/keyboard-right-arrow-button.png')} />
      </TouchableOpacity>,
      headerLeft: <BaseButton
        title='ข้าม'
        fontStyle = {[Font.style('CmPrasanmitBold'),{fontSize:29,color: Colors.tabBar, marginBottom: 25}]}
        ButtonStyle = {{backgroundColor: 'transparent', width: 60, height: 40}}
        onPress={() => props.screenProps.rootNavigation.navigate('Login')}
        loadColor='white'
      />,
    };
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          style={styles.imageBox}
          source={require('../assets/images/intro1v3.png')}
        />
        <CmPrasanmitBoldText style={styles.descriptionHeader}>
          ส่งคำขอเลือดอย่างเร่งด่วน
        </CmPrasanmitBoldText>

        <View style={styles.descriptionContainer}>
          <CmPrasanmitText style={styles.descriptionText}>
            สร้างคำร้องขอ ระบบจะส่งไปยังผู้ใช้ที่อยู่
          </CmPrasanmitText>
          <CmPrasanmitText style={styles.descriptionText}>
            บริเวณใกล้เคียงอัตโนมัติ
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
