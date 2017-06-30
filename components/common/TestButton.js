import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import React from 'react';

const TestButton = ({onPress}) => {
  return(
    <TouchableOpacity onPress={onPress} style={styles.containerStyle} >
      <Image
        source={require('../../assets/images/expo-icon@2x.png')}
        style={{ width: 20, height: 20 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    paddingTop: 1,
  },
  textStyle: {
    fontSize: 18
  }
});

export {TestButton};
