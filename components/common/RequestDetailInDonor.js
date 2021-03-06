import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { Font } from 'expo'
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const RequestDetailInDonor = ({label,information,height}) => {
  return(
    <View style={{flexDirection: 'column',justifyContent: 'center'}}>
      <View style={[styles.underline,{height:height}]}>
        <Text style={[Font.style('CmPrasanmitBold'),styles.title]}>
            {label}
        </Text>
        <View style={styles.detail}>
            <Text numberOfLines={5} style={[Font.style('CmPrasanmit'), styles.informationText]}>
                {information}
            </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  underline : {
    flexDirection: 'row',
    width: 310,
    borderBottomColor: Colors.greylight,
    borderBottomWidth: 1,
    paddingVertical: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title:{
    fontSize: 23,
    height:25,
    color: Colors.textgrey,
  },
  detail: {
    width: 200,
    backgroundColor: 'transparent',
  },
  informationText: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    fontSize: 23,
    color: Colors.textgreydetail
  }
});

export { RequestDetailInDonor };
