import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import Colors from '../../constants/Colors';
import { Font } from 'expo';
import { BaseButton } from '../../components/common/';
import { CmPrasanmitBoldText, CmPrasanmitText } from '../../components';

class InstructionThirdScreen extends Component {
  static navigationOptions = props => {
    const headerThird = (
      <View style={{flexDirection:'row',marginBottom: 20}}>
        <Text style={{color:'#F8CDD2',fontSize: 15}}> ● ●</Text>
        <Text style={{fontSize: 15,color:Colors.tabBar}}>●</Text>
      </View>
    )
    return {
      headerTitle: headerThird,
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
      <BaseButton
        title='เริ่มใช้งาน'
        fontStyle = {[Font.style('CmPrasanmit'),{fontSize:29,color: Colors.tabBar, marginBottom: 20}]}
        ButtonStyle = {{backgroundColor: 'transparent', height: 40,marginRight:10}}
        onPress={() => {
          props.screenProps.rootNavigation.navigate('Login')
          AsyncStorage.setItem('@FirstTime:key', 'NotaFirstTime')
        }}
        loadColor='white'
      />,
    }
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          style={styles.imageBox}
          source={require('../../assets/images/intro2v6.png')}
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
    color: '#575757',
  },
  descriptionText: {
    fontSize: 23,
    color:'#575757',
  }
})

export {InstructionThirdScreen}