import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Button } from './Button';
import Colors from '../../constants/Colors';
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const CardDetail = ({ list, onPress, visible }) => {
  if(visible){
  return(
    <TouchableOpacity style={[styles.requestCardContainerStyle,{borderWidth: 1, borderColor: '#DCDCDC',}]} >
      <View style={{height:40, justifyContent: 'center',alignItems: 'center',flexDirection:'row',borderBottomWidth: 1, borderColor: '#DCDCDC',}}>
        <Image source={require('../../assets/images/envelope.png')} style={{height:17,width:22}}/>
        <CmPrasanmitBoldText style={{fontSize:25,color:'#575757'}}> คำร้องขอที่ได้รับ</CmPrasanmitBoldText >
      </View >
      <View style={{height:78,backgroundColor:'#E8E8E8',flexDirection:'row'}}>
        <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
          <Image
            style={styles.imageRequestStyle}
            source={{ uri: list.thumbnail_image }}
          />
        </View>
        <View style={{flex:35,justifyContent: 'center',}}>
          <CmPrasanmitBoldText style={{fontSize:22,color:'#575757'}}>{list.title}</CmPrasanmitBoldText>
        </View>
        <View style={{flex:14,alignItems: 'center',justifyContent: 'center'}}>
          <CmPrasanmitText style={{fontSize:18,color:'#575757'}}>รายละเอียด</CmPrasanmitText>
        </View> 
      </View>
    </TouchableOpacity>
  );}
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

export {CardDetail};
