import React from 'react';
import { View, Picker,  StyleSheet } from 'react-native';

const BloodModal = ({selectBlood,onChangeBlood,selectRh,onChangeRh}) => {
  return(
    <View style={{ flexDirection: 'row',flex: 1,justifyContent: 'space-around' }}>
      <View style={{ flex: 0.1 }}/>
      <View style={{ flex: 0.3 }}>
        <Picker
          selectedValue={selectBlood}
          onValueChange={onChangeBlood}
        >
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
            <Picker.Item label="AB" value="AB" />
            <Picker.Item label="O" value="O" />
          </Picker>
      </View>
      <View style={{ flex: 0.05 }}/>
      <View style={{ flex: 0.3 }}>
        <Picker
          selectedValue={selectRh}
          onValueChange={onChangeRh}
        >
          <Picker.Item label="+" value="+" />
          <Picker.Item label="-" value="-" />
        </Picker>
      </View>
      <View style={{ flex: 0.1 }}/>
    </View>
  );
}

export { BloodModal };