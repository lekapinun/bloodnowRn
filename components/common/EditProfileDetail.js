import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Font } from 'expo';
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const EditProfileDetail = ({ label, information, onChange, editable}) => {
  return(
    <View style={styles.underline}>
        <CmPrasanmitBoldText style={styles.title}>
            {label}
        </CmPrasanmitBoldText>
        <View style={styles.detail}>
          <TextInput
            style={[Font.style('CmPrasanmitBold'),styles.informationText]}
            value={information}
            onChange={onChange}
            editable={editable}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  underline : {
    flexDirection: 'row',
    width: 310,
    borderBottomColor: '#D1D1D1',
    borderBottomWidth: 1,
    paddingVertical: 7,
    justifyContent: 'space-between'
  },
  title:{
    fontSize: 23,
    height:25,
    color: 'black',
  },
  detail: {
    width: 200,
    backgroundColor: 'transparent',
  },
  informationText: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    fontSize: 23,
    color: 'black',
    backgroundColor: 'green'
  }
});

export {EditProfileDetail};
