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
    if(status === 'finished'){
      return <CmPrasanmitText style={{fontSize:18,color:Colors.tabBar}}>เสร็จสิ้น</CmPrasanmitText>
    } else if(status === 'refresh') {
      return <Image source={require('../../assets/images/refresh.png')} style={{height:30,width:30}} />
    } else {
      return (
        <View style={{alignItems: 'center',justifyContent: 'center'}}>
          <CmPrasanmitText style={{fontSize:18,color:Colors.tabBar}}>คงเหลือ</CmPrasanmitText>
          <View style={{width:75}}>
            <CmPrasanmitText style={{fontSize:30,alignSelf: 'center',color:Colors.tabBar}}>{status}</CmPrasanmitText>
            <CmPrasanmitText style={{fontSize:18,color:Colors.tabBar,position:'absolute',bottom:2,right: 10}}>วัน</CmPrasanmitText>
          </View>
        </View>
      )
    }
  }
  return(
    <TouchableOpacity onPress={onPress}  style ={{height:75,width:340,backgroundColor:'transparent',borderColor: Colors.tabBar,borderWidth: 2,borderRadius:5,marginTop:5,marginBottom:5}}>
      <View style={{flex:1,flexDirection: 'row'}}>
        <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
          {this.renderImage()}
        </View>
        <View style={{flex:35,justifyContent: 'center',}}>
          <View style={{height:27}}>
            <CmPrasanmitBoldText style={{fontSize:25,color:Colors.tabBar}}>{name}</CmPrasanmitBoldText>
          </View>
          <CmPrasanmitText style={{fontSize:16}}>{hospital}</CmPrasanmitText>
        </View>
        <View style={{flex:14,borderColor: Colors.tabBar,borderLeftWidth: 2,alignItems: 'center',justifyContent: 'center'}}>
          {this.renderStatus()}  
        </View>                        
      </View>
    </TouchableOpacity>
  );
}

export { CardHistoryRequest };