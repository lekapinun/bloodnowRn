import React from 'react';
import { TouchableOpacity, StyleSheet, Text,Image } from 'react-native';
import { Font } from 'expo'

const ButtonBack = ({onPress,color}) => {
  return(
    <TouchableOpacity 
      onPress={onPress}
      style={{width:75}}
    >
      <Image
        source={require('../../node_modules/react-navigation/src/views/assets/back-icon.png')}
        style={{tintColor:color, marginLeft:10}}
      />
    </TouchableOpacity>
  );
}
export { ButtonBack };