import React from 'react';
import { View, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { CmPrasanmitText } from '../CmPrasanmitText';
import { PickerModalDate } from './PickerModalDate';

const ManualDonate = ({manualModal, style}) => {
  return(
    <TouchableOpacity onPress={manualModal} style={[style,{flexDirection: 'row'}]} >
      <CmPrasanmitText style={{ fontSize: 20, }}>
        แก้ไข
      </CmPrasanmitText>
      <Image
        style={{ height: 20, width: 20}}
        source={require('../../assets/images/settings.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

})

export { ManualDonate };
