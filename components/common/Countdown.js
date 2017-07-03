import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font } from 'expo';

const Countdown = ({recentDonateDate}) => {
  const timeRemaining = (7776000000 -( (new Date()) - (new Date(recentDonateDate))))
    / (24*60*60*1000);
  return (
    <View style={styles.countdownContainerStyle}>
      <View style={styles.countdownViewStyle}>
        <Text>เดือน</Text>
        <Text style={[Font.style('CmPrasanmit'),styles.countdownTextStyle]}>{Math.floor(timeRemaining/30)}</Text>
      </View>
      <View style={styles.countdownViewStyle}>
        <Text>วัน</Text>
        <Text style={[Font.style('CmPrasanmit'),styles.countdownTextStyle]}>{Math.floor(timeRemaining%30)}</Text>
      </View>
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
