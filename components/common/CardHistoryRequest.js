import React, { Component } from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native'
import { Font } from 'expo'
import Colors from '../../constants/Colors';
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const CardHistoryRequest = ({blood,bloodType,name,hospital,status,onPress}) => {
  renderImage = () => {
    switch(blood + bloodType) {
        case 'A+':
            return <Image source={require('../../assets/images/Ap.png')} style={{height:50,width:50}} />
        case 'A-':
            return <Image source={require('../../assets/images/An.png')} style={{height:50,width:50}} />
        case 'B+':
            return <Image source={require('../../assets/images/Bp.png')} style={{height:50,width:50}} />
        case 'B-':
            return <Image source={require('../../assets/images/Bn.png')} style={{height:50,width:50}} />
        case 'AB+':
            return <Image source={require('../../assets/images/ABp.png')} style={{height:50,width:50}} />
        case 'AB-':
            return <Image source={require('../../assets/images/ABn.png')} style={{height:50,width:50}} />
        case 'O+':
            return <Image source={require('../../assets/images/Op.png')} style={{height:50,width:50}} />
        case 'O-':
            return <Image source={require('../../assets/images/On.png')} style={{height:50,width:50}} />
        default:
            return <Image source={require('../../assets/images/Ap.png')} style={{height:50,width:50}} />
    }
  }
  
  renderStatus = () => {
    if(status === 'complete'){
      return <CmPrasanmitBoldText style={{fontSize:18,color:Colors.tabBar}}>เสร็จสิ้น</CmPrasanmitBoldText>
    } else if(status === 'refresh') {
      return (
        <View>
          <CmPrasanmitBoldText style={{fontSize:18,color:Colors.tabBar}}>คำร้องขอ</CmPrasanmitBoldText>
          <CmPrasanmitBoldText style={{fontSize:18,color:Colors.tabBar}}>หมดอายุ!</CmPrasanmitBoldText>
        </View>
      )
    } else {
      return (
        <View style={{alignItems: 'center',justifyContent: 'center'}}>
          <CmPrasanmitBoldText style={{fontSize:18,color:Colors.tabBar}}>คงเหลือ</CmPrasanmitBoldText>
          <View style={{width:75}}>
            <CmPrasanmitBoldText style={{fontSize:30,alignSelf: 'center',color:Colors.tabBar}}>{status}</CmPrasanmitBoldText>
            <CmPrasanmitBoldText style={{fontSize:18,color:Colors.tabBar,position:'absolute',bottom:2,right:12}}>วัน</CmPrasanmitBoldText>
          </View>
        </View>
      )
    }
  }
  return(
    <TouchableOpacity onPress={onPress}  style ={{height:75,width:340,borderColor:'#F3F3F3',borderWidth:0.5,shadowColor:'#000000',marginVertical:5,shadowOffset: {width: 0, height: 3},shadowOpacity: 0.08,}}>
      <View style={{flex:1,flexDirection: 'row'}}>
        <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
          {this.renderImage()}
        </View>
        <View style={{flex:35,justifyContent: 'center',}}>
          <View style={{height:27}}>
            <CmPrasanmitBoldText style={{fontSize:25,color:Colors.tabBar}}>{name}</CmPrasanmitBoldText>
          </View>
          <CmPrasanmitText style={{fontSize:17,color:Colors.textgrey}}>{hospital}</CmPrasanmitText>
        </View>
        <View style={{flex:14,alignItems: 'center',justifyContent: 'center'}}>
          {this.renderStatus()}  
        </View>   
        <View style={{flex:2}}/>
        <View style={{flex:2,backgroundColor: status === 'complete' ? Colors.textgreydetail : status === 'refresh' ? Colors.redHis : Colors.greenHis }}/>
      </View>
    </TouchableOpacity>
  );
}

export { CardHistoryRequest };