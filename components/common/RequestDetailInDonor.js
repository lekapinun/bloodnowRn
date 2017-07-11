import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo'
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const RequestDetailInDonor = ({label,information,height}) => {
  return(
    <View style={styles.underline}>
        <CmPrasanmitBoldText style={styles.title}>
    <View style={{flexDirection: 'column',justifyContent: 'center'}}>
      <View style={[styles.underline,{height:height}]}>
        <Text style={[Font.style('CmPrasanmitBold'),styles.title]}>
            {label}
        </CmPrasanmitBoldText>
        <View style={styles.detail}>
            <CmPrasanmitText numberOfLines={5} style={styles.informationText}>
                {information}
            </CmPrasanmitText>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: 'grey'
  }
});

export { RequestDetailInDonor };
