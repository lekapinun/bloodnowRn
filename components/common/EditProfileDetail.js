import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Font } from 'expo';
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'
import Colors from '../../constants/Colors'

const EditProfileDetail = ({ label, information, onChange, editable, keyboardType}) => {
  return(
    <View style={styles.underline}>
        <CmPrasanmitBoldText style={styles.title}>
            {label}
        </CmPrasanmitBoldText>
        <View style={{
          borderBottomColor: '#DCDCDC',
          borderBottomWidth: (editable!==false) ? 1 : 0,
          //paddingVertical: 3,
          }}
        >
          <TextInput
            style={[Font.style('CmPrasanmitBold'),styles.informationText]}
            value={information}
            onChange={onChange}
            editable={editable}
            keyboardType={keyboardType}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  underline : {
    flexDirection: 'row',
    width: 310,
    //borderBottomColor: '#D1D1D1',
    //borderBottomWidth: 1,
    paddingVertical: 7,
    justifyContent: 'space-between'
  },
  title:{
    fontSize: 23,
    height:25,
    color: Colors.tabBar,
    alignSelf: 'center'
  },
  informationText: {
    width: 200,
    height: 30,
    fontSize: 23,
    color: '#575757',
    /* borderBottomWidth: 1,
    borderBottomColor: 'grey', */
  }
});

export {EditProfileDetail};
