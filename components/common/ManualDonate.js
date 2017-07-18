import React from 'react';
import { View, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { CmPrasanmitText } from '../CmPrasanmitText';
import { PickerModalDate } from './PickerModalDate';

const ManualDonate = ({disableManual, manualModal, style}) => {
  return(
    <TouchableOpacity disabled={disableManual} onPress={manualModal} style={[style,styles.container]} >
      <CmPrasanmitText style={{ fontSize: 20, color: 'white'}}>
        แก้ไข
      </CmPrasanmitText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    borderRadius: 8,
    height: 30,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tabBar,
  },
})

export { ManualDonate };
