import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font } from 'expo';

const Countdown = ({recentDonateDate}) => {
  const timeRemaining = (7776000000 -( (new Date()) - (new Date(recentDonateDate))))
    / (24*60*60*1000);
  if( timeRemaining > 0) {
    remainMonth = Math.floor(timeRemaining/30);
    remainDate = Math.floor(timeRemaining%30);
    nextDonation = new Date(recentDonateDate);
    //nextDonation.setDate(nextDonation.getDate());
    countdownStatus =
      <Text>
        {'การบริจาคครั้งถัดไป วันที่' + nextDonation.getDate().toString()
        + '/' + nextDonation.getMonth().toString()
        + '/' + nextDonation.getFullYear().toString()}
      </Text>

  }
  else {
    remainDate = 0;
    remainMonth = 0;
    countdownStatus = <Text style={{fontSize: 23, alignSelf: 'center'}}>ตอนนี้คุณสามารถบริจาคได้แล้ว</Text>
  }

  return (
    <View style={{width: '80%', height: '50%', alignSelf: 'center'}}>
      <Text>
        นับถอยหลัง
      </Text>
        <View style={styles.countdownContainerStyle}>
        <View style={styles.countdownViewStyle}>
          <Text>เดือน</Text>
          <Text style={[Font.style('CmPrasanmit'),styles.countdownTextStyle]}>{remainMonth}</Text>
        </View>
        <View style={styles.countdownViewStyle}>
          <Text>วัน</Text>
          <Text style={[Font.style('CmPrasanmit'),styles.countdownTextStyle]}>{remainDate}</Text>
        </View>
      </View>
      {countdownStatus}
    </View>
  );
}

const styles = StyleSheet.create({
  countdownContainerStyle: {
    //backgroundColor: 'rgba(255, 77, 77,0.8)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  countdownViewStyle: {
    //backgroundColor: 'rgb(255, 100, 100)',
    width: '30%',
    height: '100%',
  },
  countdownTextStyle: {
    alignSelf: 'center',
    fontSize: 55,
  },
});

export {Countdown};
