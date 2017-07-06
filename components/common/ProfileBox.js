import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Button } from './Button';
import {  SimpleLineIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

const ProfileBox = (props) => {
  return (
    <View style={styles.profileContainer}>
      <Image
        style={styles.imageStyle}
        source={{ uri: props.list.thumbnail_image }}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.detailTextStyle}>{props.list.title}</Text>
        <Text style={styles.detailTextStyle}>{props.list.bloodType}</Text>
        <Button
          title="ออกจากระบบ"
          onPress={() => {}}
          sizeFont={23}
          colorFont={Colors.tabBar}
          buttonColor="white"
          onPress={props.logOut} 
        />
      </View>
      <TouchableOpacity>
        <SimpleLineIcons
            name="note"
            size={23}
            color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignSelf: 'center',
    width: 300,
    height: 200,
    backgroundColor: Colors.tabBar,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  detailContainer: {
    flexDirection: 'column',

  },
  detailTextStyle: {
    color: 'white'
  }
});

export {ProfileBox};
