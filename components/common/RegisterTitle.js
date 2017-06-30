import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Font } from 'expo'


const RegisterTitle = (props) => {
  return(
    <Text style={[Font.style('CmPrasanmitBold'),styles.title]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title:{
   fontSize: 23,
    height:25,
    color: '#E84A5F',
  },
});

export { RegisterTitle };