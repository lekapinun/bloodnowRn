import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Button } from './Button';
import { SimpleLineIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

const ProfileBox = (props) => {
  return (
    <View style={styles.profileContainer}>
      <Image
        style={styles.imageStyle}
        source={{ uri: 'https://cache.gmo2.sistacafe.com/images/uploads/summary/image/1484/1437134731-taylor-swift-009.jpg' }}
      />
      <View style={styles.detailContainer}>
        <CmPrasanmitBoldText style={styles.nameTextStyle}>{capitalizeFirstLetter(props.user.name)}</CmPrasanmitBoldText>
        <CmPrasanmitText style={styles.detailTextStyle}>{'กรุ๊ปเลือด ' + props.user.blood + props.user.blood_type}</CmPrasanmitText>
        <TouchableOpacity onPress={() => {}} style={{marginTop:15,backgroundColor:'white',borderRadius:5}}>
          <Button
            title="ออกจากระบบ"
            sizeFont={24}
            colorFont={Colors.tabBar}
            buttonColor="transparent"
            onPress={props.logOut}
            ButtonWidth={120}
            ButtonHeight={40}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={props.onPress}
        disabled={props.disableEdit}
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
    height: 175,
    backgroundColor: Colors.tabBar,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',

  },
  imageStyle: {
    borderRadius: 60,
    height: 120,
    width: 120,
    marginVertical: 20,
    marginLeft: 25,
    borderWidth:1,
    borderColor: 'grey'
  },
  detailContainer: {
    flexDirection: 'column',
    marginLeft: 25,
  },
  nameTextStyle: {
    color: 'white',
    fontSize: 40,
  },
  detailTextStyle: {
    color: 'white',
    fontSize: 22,
  },
  editProfileButton: {
    position:'absolute',
    top: 20,
    right: 20,
  },
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export {ProfileBox};
