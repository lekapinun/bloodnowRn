import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Colors from '../../constants/Colors';
import { Font } from 'expo';
import { BaseButton } from '../../components/common/';
import { CmPrasanmitBoldText, CmPrasanmitText } from '../../components';

class InstructionSecondScreen extends Component {
  static navigationOptions = props => {
    const headerSecond = (
      <View style={{flexDirection:'row',marginBottom: 20}}>
        <Text style={{color:'#F8CDD2',fontSize: 15}}>●</Text>
        <Text style={{fontSize: 15,color:Colors.tabBar}}> ● </Text>
        <Text style={{color:'#F8CDD2',fontSize: 15}}>●</Text>
      </View>
    )
    return {
      headerTitle: headerSecond,
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
      },
      headerRight:
      <TouchableOpacity onPress={() => props.navigation.navigate('Instruction3')}>
        <Image style={{ height: 22, width: 22, marginBottom: 15,marginRight:10}} source={require('../../assets/images/keyboard-right-arrow-button.png')} />
      </TouchableOpacity>,
      headerLeft: <BaseButton
        title='ข้าม'
        fontStyle = {[Font.style('CmPrasanmit'),{fontSize:29,color: Colors.tabBar, marginBottom: 20}]}
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
          source={require('../../assets/images/intro1v3.png')}
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
    marginTop: 50,
    borderColor: Colors.greylight,
    borderWidth: 0.5,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  descriptionHeader: {
    alignSelf: 'center',
    fontSize: 40,
    marginTop: 35,
    color: Colors.textgrey,
  },
  descriptionText: {
    fontSize: 23,
    color: Colors.textgrey,
  }
})

export {InstructionSecondScreen}