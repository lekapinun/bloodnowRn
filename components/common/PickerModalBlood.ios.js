import React from 'react';
import { View, TouchableOpacity,  StyleSheet, Modal, Text } from 'react-native';
import { Font } from 'expo'
import { BloodModal } from './BloodModal'

const PickerModalBlood = ({pickerVisible,onPressCancel,onPressSubmit,selectOne,onChangeOne,selectTwo,onChangeTwo}) => {
  return(
    <Modal
      styles={{ paddingTop: 280 }}
      animationType={"slide"}
      transparent={true}
      visible={pickerVisible}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity  style={{ flex: 0.65 }} onPress={onPressCancel}/>
        <View style={{ flex: 0.35, backgroundColor:'white', borderColor:'#C7C7C7', borderWidth: 0.5 }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems:'flex-start' }}>
            <TouchableOpacity style={{marginTop:10,marginLeft:10}} onPress={onPressCancel}>
              <Text style={[Font.style('CmPrasanmit'),{fontSize: 28,color: '#2D213F'}]}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:10,marginRight:10}} onPress={onPressSubmit}>
              <Text style={[Font.style('CmPrasanmit'),{fontSize: 28,color: '#2D213F'}]}>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
          <BloodModal
            selectBlood = {selectOne}
            onChangeBlood = {onChangeOne}
            selectRh = {selectTwo}
            onChangeRh = {onChangeTwo}
          />
        </View>
      </View>
    </Modal>
  );
}

export { PickerModalBlood };