import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo'

const RequestDetailInDonor = ({label,information}) => {
  return(
    <View style={styles.underline}>
        <Text style={[Font.style('CmPrasanmitBold'),styles.title]}>
            {label}
        </Text>
        <View style={styles.detail}>
            <Text numberOfLines={5} style={[Font.style('CmPrasanmit'), styles.informationText]}>
                {information}
            </Text>
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
    color: 'grey'
  }
});

export { RequestDetailInDonor };