import React, { Component } from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'
import { Font } from 'expo'
import Colors from '../../constants/Colors';
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const CardHistoryRequest = ({blood,bloodType,name,hospital,status}) => {
  

  renderStatus = () => {
    if(status === 'finished'){
      return <CmPrasanmitText style={{fontSize:18,color:Colors.tabBar}}>เสร็จสิ้น</CmPrasanmitText>
    } else if(status === 'Refresh') {
      return <Text>(o)</Text>
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
    <View style ={{height:75,width:340,backgroundColor:'transparent',borderColor: Colors.tabBar,borderWidth: 2,borderRadius:5,marginTop:5,marginBottom:5}}>
      <View style={{flex:1,flexDirection: 'row'}}>
        <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
          <Text style={{fontSize:50}}>{blood}{bloodType}</Text>
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
    </View>
  );
}

export { CardHistoryRequest };