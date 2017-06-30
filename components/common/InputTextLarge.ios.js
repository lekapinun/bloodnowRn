import React from 'react';
import { StyleSheet, TextInput, View, Image, Text } from 'react-native';
import { Font } from 'expo'
import { RegisterTitle } from './RegisterTitle'

const InputTextLarge = ({label,secureTextEntry,onChangeText,value,keyboardType,maxLength,placeholder}) => {
  return(
    <View>
      <View style={{marginTop: 15}}> 
        <RegisterTitle>{label}</RegisterTitle>
        <View style={{marginTop: 10}}>
          <TextInput
            multiline
            style={[Font.style('CmPrasanmit'),styles.input]}
            autoCorrect={false}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize='none'
            maxLength={maxLength}
            placeholder={placeholder}
          />
        </View>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingLeft:10,
    fontSize: 25,
    backgroundColor: 'transparent',
    borderColor: '#D1D1D1',
    borderWidth: 1,
    width: 310,
    height: 100,
    padding: 10,
  },
});

export { InputTextLarge };