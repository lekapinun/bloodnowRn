import React from 'react';
import { StyleSheet, TextInput, View, Image, Text } from 'react-native';
import { Font } from 'expo'
import { RegisterTitle } from './RegisterTitle'

const InputText = ({label,secureTextEntry,onChangeText,value,keyboardType,maxLength,placeholder,onEndEditing}) => {
  return(
    <View>
      <View style={styles.underline}> 
        <RegisterTitle>{label}</RegisterTitle>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={[Font.style('CmPrasanmit'),styles.input]}
            autoCorrect={false}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize='none'
            maxLength={maxLength}
            placeholder={placeholder}
            onEndEditing={onEndEditing}
          />
        </View>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  underline : {
    borderBottomColor: '#D1D1D1',
    borderBottomWidth: 1,
    marginTop: 15,
  },
  input: {
    height: 30,
    width: 310,
    paddingLeft:10,
    fontSize: 25,
    backgroundColor: 'transparent',
  },
  subVali: {
    color: '#E84A5F',
    fontSize: 18,
  }
});

export { InputText };