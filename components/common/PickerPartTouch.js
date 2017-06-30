import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Font } from 'expo'
import { RegisterTitle } from './RegisterTitle'

const PickerPartTouch = ({label,information,onPress}) => {
  return(
    <View style={styles.underline}> 
      <RegisterTitle>{label}</RegisterTitle>
      <TouchableOpacity onPress={onPress} >
        <View style={styles.touchInput}>
          {information}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  underline : {
    borderBottomColor: '#D1D1D1',
    borderBottomWidth: 1,
    marginTop: 15,
  },
  touchInput: {
    height: 30,
    width: 310,
    backgroundColor: 'transparent',
  },
});

export { PickerPartTouch };