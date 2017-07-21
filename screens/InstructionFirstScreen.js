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

export default class InstructionFirstScreen extends Component {
  static navigationOptions = props => {
    return {
      headerTitle : <View style={{flexDirection:'row'}}><Text style={{fontSize: 15, marginBottom: 20,color:Colors.tabBar}}>●</Text><Text style={{color:'#F8CDD2',fontSize: 15, marginBottom: 20}}> ● ●</Text></View> ,
      headerTintColor: '#E84A5F',
      gesturesEnabled: true,
      headerStyle: {
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        /* shadowColor: 'grey',
        borderColor: 'white',
        shadowOffset: {width: 1, height: -1},
        shadowOpacity: 0.3,
        shadowRadius: 5, */
      },
      headerRight:
      <TouchableOpacity title="Next" onPress={() => props.navigation.navigate('Instruction2')}>
        <Image style={{ height: 22, width: 22, marginBottom: 15,marginRight:10}} source={require('../assets/images/keyboard-right-arrow-button.png')} />
      </TouchableOpacity>,
      headerLeft: <BaseButton
        title='ข้าม'
        fontStyle = {[Font.style('CmPrasanmit'),{fontSize:29,color: Colors.tabBar, marginBottom: 20}]}
        ButtonStyle = {{backgroundColor: 'transparent', width: 60, height: 40}}
        onPress={() => props.screenProps.rootNavigation.navigate('Login')}
        loadColor='white'
      />,
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          style={styles.imageBox}
          source={require('../assets/images/intro12.png')}
        />
        <CmPrasanmitBoldText style={styles.descriptionHeader}>
          Blood Now
        </CmPrasanmitBoldText>

        <View style={styles.descriptionContainer}>
          <CmPrasanmitText style={styles.descriptionText}>
            แอพบริจาคเลือกที่มาพร้อมกับความสามารถ
          </CmPrasanmitText>
          <CmPrasanmitText style={styles.descriptionText}>
            หลากหลายและยังช่วยให้คุณหาเลือด
          </CmPrasanmitText>
          <CmPrasanmitText style={styles.descriptionText}>
            ได้รวดเร็วขึ้น!
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
  },
  descriptionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  descriptionHeader: {
    alignSelf: 'center',
    fontSize: 45,
    marginTop: 35,
    color: Colors.textgrey,
  },
  descriptionText: {
    fontSize: 25,
    color: Colors.textgrey,
  }
})
