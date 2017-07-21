import React, { Component } from 'react';
import { Picker } from 'react-native';

const One2TenPicker = ({selectNumber,onChangeNumber}) => {
  return(
    <Picker
        selectedValue={selectNumber}
        onValueChange={onChangeNumber}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>
  );
}

export {One2TenPicker};
