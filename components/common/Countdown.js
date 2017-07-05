import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font } from 'expo';
import Colors from '../../constants/Colors';
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const Countdown = ({recentDonateDate }) => {
  const timeRemaining = (7776000000 -( (new Date()) - (new Date(recentDonateDate))))
    / (24*60*60*1000);
  if( timeRemaining > 0) {
    remainMonth = Math.floor(timeRemaining/30);
    remainDate = Math.floor(timeRemaining%30);
    nextDonation = new Date(recentDonateDate);
    countdownStatus =
      <Text>
        {'การบริจาคครั้งถัดไป วันที่' + nextDonation.getDate().toString()
        + '/' + (nextDonation.getMonth() + 1)
        + '/' + nextDonation.getFullYear().toString()}
      </Text>

  }
  else {
    remainDate = 0;
    remainMonth = 0;
    countdownStatus = <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
    <CmPrasanmitText style={{color: Colors.tabBar,fontSize:25}}>ตอนนี้คุณสามารถบริจาคได้แล้ว</CmPrasanmitText>
    </View>
  }

  return (
    <View style={styles.countdownBorder}>
      <View style={{width:270,marginTop:15,marginBottom:15}}>
        <CmPrasanmitBoldText style={{color: Colors.tabBar,fontSize:30}}>
          นับถอยหลัง
        </CmPrasanmitBoldText>
      </View>
      
      <View style={styles.countdownContainerStyle}>
        <View style={styles.countdownViewStyle}>
          <View style={[styles.textCenterView,{flex:2,backgroundColor:Colors.tabBar,width: 102,}]}>
            <CmPrasanmitText style={{color: 'white',fontSize:80}}>{remainMonth}</CmPrasanmitText>
          </View>
          <View style={[styles.textCenterView,{flex:1,width: 102,}]}>
            <CmPrasanmitText style={{color: Colors.tabBar,fontSize:30}}>เดือน</CmPrasanmitText>
          </View>
        </View>

        <View style={styles.countdownViewStyle}>
          <View style={[styles.textCenterView,{flex:2,backgroundColor:Colors.tabBar,width: 102,}]}>
            <CmPrasanmitText style={{color: 'white',fontSize:80,}}>{remainDate}</CmPrasanmitText>
          </View>
          <View style={[styles.textCenterView,{flex:1,width: 102,}]}>
            <CmPrasanmitText style={{color: Colors.tabBar,fontSize:30}}>วัน</CmPrasanmitText>
          </View>
        </View>
      </View>

      {countdownStatus}
    </View>
  );
}

const styles = StyleSheet.create({
  countdownBorder: {
    width: 340,
    height: 250,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.tabBar,
    flexDirection: 'column',
    alignItems: 'center'
  },
  countdownContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height:125
  },
  countdownViewStyle: {
    width: 102,
    height: 125,
    marginRight:5,
    marginLeft:5,
    shadowColor: 'grey',
    shadowOffset: {width: 1, height: -1},
    shadowOpacity: 0.5,
  },
  countdownTextStyle: {
    alignSelf: 'center',
    fontSize: 55,
    backgroundColor: Colors.tabBar,
    color: 'white',
    height:70,
  },
  textCenterView: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export {Countdown};
