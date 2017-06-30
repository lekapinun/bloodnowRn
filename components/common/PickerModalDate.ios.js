import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Font } from 'expo'
import { DateModal } from './DateModal'

const PickerModalDate = ({pickerVisible,onPressCancel,onPressSubmit,selectOne,onChangeOne}) => {
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
              <Text style={[Font.style('CmPrasanmit'),styles.textHadePicker]}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:10,marginRight:10}} onPress={onPressSubmit}>
              <Text style={[Font.style('CmPrasanmit'),styles.textHadePicker]}>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
          <DateModal
            selectDate = {selectOne}
            onChangeDate = {onChangeOne}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textHadePicker: {
    fontSize: 28,
    color: '#2D213F'
  },
});


export { PickerModalDate };