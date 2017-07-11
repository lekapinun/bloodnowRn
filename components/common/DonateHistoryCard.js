import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { CmPrasanmitText } from '../CmPrasanmitText';
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText';

const DonateHistoryCard = ({ list, onPress, gropBlood }) => {
  return(
    <TouchableOpacity onPress={onPress} style={[styles.requestCardContainerStyle,{borderWidth: 1, borderColor: '#DCDCDC',}]} >
      <View style={{height:78,backgroundColor:'#E8E8E8',flexDirection:'row'}}>
        <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
          <Image
            style={styles.imageRequestStyle}
            source={{ uri: list.thumbnail_image }}
          />
          <View style={{height:15,width:30,position:'absolute',bottom:12,left:18,backgroundColor:Colors.tabBar,borderRadius:15,alignItems: 'center',justifyContent:'center'}}>
            <CmPrasanmitBoldText style={{fontSize:17,color:'white',backgroundColor:'transparent'}}>{gropBlood}</CmPrasanmitBoldText>
          </View>
        </View>
        <View style={{flex:35,justifyContent: 'center',}}>
          <CmPrasanmitBoldText style={{fontSize:22,color:'#575757'}}>{list.title}</CmPrasanmitBoldText>
        </View>
        <View style={{flex:14,alignItems: 'center',justifyContent: 'center'}}>
          <CmPrasanmitText style={{fontSize:18,color:'#575757'}}>รายละเอียด</CmPrasanmitText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  requestCardContainerStyle: {
    height: 78,
    width: 340,
    flexDirection: 'column',
    borderWidth: 1, borderColor: '#DCDCDC'

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


export { DonateHistoryCard };
