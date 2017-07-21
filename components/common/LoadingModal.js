import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import {CmPrasanmitText} from '../'
import Colors from '../../constants/Colors'

const LoadingModal = ({visible}) => {
  return (
    <Modal
        transparent={true}
        visible = {visible}
    >
        <View style={{flex:1,justifyContent:'center',backgroundColor:'transparent',alignItems:'center',backgroundColor:'rgba(52, 52, 52, 0.3)'}}>
        <View style={{backgroundColor:'white',height:134,paddingHorizontal:20,marginTop:-10,alignItems:'center',justifyContent:'space-around',borderRadius:10}}>
            <View/>
            <ActivityIndicator style={{marginRight:-3,marginBottom:-4}} size="large" />
            <CmPrasanmitText style={{fontSize:20,color:Colors.textgreydetail,marginTop:15}}>กำลังดาวน์โหลด</CmPrasanmitText>
            <View/>
        </View>
        </View>   
    </Modal>
  )
}

export {LoadingModal}