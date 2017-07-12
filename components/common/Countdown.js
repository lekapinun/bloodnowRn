import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font } from 'expo';
import Colors from '../../constants/Colors';
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const Countdown = ({recentDonateDate,last_donate }) => {
  const timeRemaining = Math.floor(recentDonateDate/(86400000))
  let remainMonth = '00';
  let remainDate = '00';
  if( timeRemaining > 0) {
    remainMonth = Math.floor(timeRemaining/30).toString();
    (remainMonth.length === 1) ? remainMonth = '0' + remainMonth : null
    remainDate = Math.floor(timeRemaining%30).toString();
    (remainDate.length === 1) ? remainDate = '0' + remainDate : null
    const nextDonation = new Date(new Date().getTime() + (86400000 * timeRemaining));
    countdownStatus =
    <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
    <CmPrasanmitText style={{color: Colors.tabBar,fontSize:25}}>{last_donate}</CmPrasanmitText>
    </View>
    {/* <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
      <CmPrasanmitText style={{color: Colors.tabBar,fontSize:25}}>
        {'การบริจาคครั้งถัดไป วันที่ ' + nextDonation.getDate().toString()
        + '/' + (nextDonation.getMonth() + 1)
        + '/' + nextDonation.getFullYear().toString()}
      </CmPrasanmitText>
    </View> */}

  }
  else {
    remainDate = '00';
    remainMonth = '00';
    countdownStatus = <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
    <CmPrasanmitText style={{color: Colors.tabBar,fontSize:25}}>{last_donate}</CmPrasanmitText>
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
          <View style={[styles.textCenterView,{flex:2,backgroundColor:Colors.tabBar}]}>
            <CmPrasanmitText style={{color: 'white',fontSize:80}}>{remainMonth}</CmPrasanmitText>
          </View>
          <View style={[styles.textCenterView,{flex:1}]}>
            <CmPrasanmitText style={{color: Colors.tabBar,fontSize:30}}>เดือน</CmPrasanmitText>
          </View>
        </View>

        <View style={styles.countdownViewStyle}>
          <View style={[styles.textCenterView,{flex:2,backgroundColor:Colors.tabBar}]}>
            <CmPrasanmitText style={{color: 'white',fontSize:80,}}>{remainDate}</CmPrasanmitText>
          </View>
          <View style={[styles.textCenterView,{flex:1}]}>
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
    width: 122,
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
