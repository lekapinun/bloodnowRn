import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Button } from './Button';
import { SimpleLineIcons } from '@expo/vector-icons';
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
        <Text style={styles.detailTextStyle}>{'กรุ๊ปเลือด' + props.list.bloodType}</Text>
        <Button
          title="ออกจากระบบ"
          onPress={() => {}}
          sizeFont={18}
          colorFont={Colors.tabBar}
          buttonColor="white"
          onPress={props.logOut}
          ButtonWidth={100}
          ButtonHeight={40}
        />
      </View>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={props.onPress}
      >
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
    width: 350,
    height: 150,
    backgroundColor: Colors.tabBar,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',

  },
  imageStyle: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginVertical: 20,
    marginLeft: 30,
  },
  detailContainer: {
    flexDirection: 'column',
    marginLeft: 25,
  },
  detailTextStyle: {
    marginVertical: 5,
    color: 'white',
    fontSize: 18,
  },
  editProfileButton: {
    position:'absolute',
    top: 20,
    right: 20,
  },
});

export {ProfileBox};
