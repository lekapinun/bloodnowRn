import React from 'react';
import { StyleSheet, TextInput, View, Image, Text } from 'react-native';
import { Font } from 'expo'
import { RegisterTitle } from './RegisterTitle'

const RegisterInput = ({label,secureTextEntry,onChangeText,value,keyboardType,maxLength,placeholder,validate,subvalidate}) => {
let vali
if(validate.charAt(0) === '0' && validate.charAt(1) === '1' ) { vali = <View style={{width:35,height:30}}><Image source={require('../../assets/icons/ex.png')} style={{width:25,height:25}}/></View> }
else if(validate.charAt(0) === '1' && validate.charAt(2) === '1') { vali = <View style={{width:35,height:30}}><Image source={require('../../assets/icons/ex.png')} style={{width:25,height:25}}/></View>}
else{ vali = <View style={{width:35,height:30}}/>} 
let subvali
/*if(validate.charAt(0) === '1' && validate.charAt(2) === '1' ) { vali = <View style={{width:35,height:30}}><Image source={require('../../assets/icons/ex.png')} style={{width:25,height:25}}/></View>}
else{ vali = <View style={{width:35,height:30}}/>} */
if(validate.charAt(2) === '1' ) { subvali = <Text style={[Font.style('CmPrasanmit'),styles.subVali]}>{subvalidate}</Text> }
else{ subvali = <Text></Text>} 
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
          />
          {vali}
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        {subvali}
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
    width: 275,
    paddingLeft:10,
    fontSize: 25,
    backgroundColor: 'transparent',
  },
  subVali: {
    color: '#E84A5F',
    fontSize: 18,
  }
});

export { RegisterInput };