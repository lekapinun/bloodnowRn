import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Font } from 'expo'

const Button = ({title,onPress,buttonColor,sizeFont,ButtonHeight,ButtonWidth,touchable,colorFont}) => {
  return(
    <TouchableOpacity 
      style={[styles.buttonStyle,{backgroundColor: buttonColor,width: ButtonWidth, height: ButtonHeight}]} 
      onPress={onPress}
      disabled={touchable}
    >
      <Text style={[Font.style('CmPrasanmit'),{fontSize: sizeFont,color: colorFont}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export { Button };
