import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Button } from './Button';
import Colors from '../../constants/Colors';
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const CardDetail = ({ list, onPress, img, visible, gropBlood ,ready}) => {
  console.log('sadfdsafadsfdsaf')
  console.log(list)
  console.log('sadfdsafadsfdsaf')
  if(visible && list !== ''){
    return(
      <TouchableOpacity onPress={onPress} style={[styles.requestCardContainerStyle,{borderWidth: 1, borderColor: Colors.greylight,}]} >
        <View style={{height:40, justifyContent: 'center',alignItems: 'center',flexDirection:'row',borderBottomWidth: 1, borderColor: '#DCDCDC',}}>
          <Image source={require('../../assets/images/envelope.png')} style={{height:17,width:22}}/>
          <CmPrasanmitBoldText style={{fontSize:25,color:'#575757'}}> คำร้องขอที่ได้รับ</CmPrasanmitBoldText >
        </View >
        <View style={{height:78,backgroundColor:'#E8E8E8',flexDirection:'row'}}>
          <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
            <Image
              style={styles.imageRequestStyle}
              source={{ uri: img }}
            />
            {/* <View style={{height:15,width:30,position:'absolute',bottom:12,left:18,backgroundColor:Colors.tabBar,borderRadius:15,alignItems: 'center',justifyContent:'center'}}>
              <CmPrasanmitBoldText style={{fontSize:17,color:'white',backgroundColor:'transparent'}}>{gropBlood}</CmPrasanmitBoldText>
            </View> */}
          </View>
          <View style={{flex:35,justifyContent: 'center',}}>
            <CmPrasanmitBoldText style={{fontSize:22}}>{capitalizeFirstLetter(list.name)}</CmPrasanmitBoldText>
          </View>
          <View style={{flex:14,alignItems: 'center',justifyContent: 'center'}}>
            <CmPrasanmitText style={{fontSize:18,color:Colors.textgrey,marginRight:10}}>รายละเอียด</CmPrasanmitText>
          </View> 
        </View>
      </TouchableOpacity>
    );
  }
  else if (visible && list === '' ) {
    let message
    if(ready){
      message = 'ไม่มีคำร้องขอ'
    } else {
      message = 'ตอนนี้คุณไม่สามารถที่จะบริจาคเลือด'
    }
    return(
      <TouchableOpacity onPress={null} style={[styles.requestCardContainerStyle,{borderWidth: 1, borderColor: '#DCDCDC',}]} >
        <View style={{height:40, justifyContent: 'center',alignItems: 'center',flexDirection:'row',borderBottomWidth: 1, borderColor: '#DCDCDC',}}>
          <Image source={require('../../assets/images/envelope.png')} style={{height:17,width:22}}/>
          <CmPrasanmitBoldText style={{fontSize:25,color:'#575757'}}> คำร้องขอที่ได้รับ</CmPrasanmitBoldText >
        </View >
        <View style={{height:78,flexDirection:'row'}}>
          <CmPrasanmitBoldText style={{marginTop:10,marginLeft:10,fontSize:25,color:'#DCDCDC'}}>{message}</CmPrasanmitBoldText>
        </View>
      </TouchableOpacity>
    );
  }
  else {
    return (
      <View />
    );}
}

const styles = StyleSheet.create({
  requestCardContainerStyle: {
    height: 120,
    width: 340,
    flexDirection: 'column',
    //alignItems: 'center',
  },
  imageRequestStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth:0.1,
    borderColor: '#575757'
  },
  detailRequestStyle: {
    paddingLeft: 20,
  },

});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export {CardDetail};
