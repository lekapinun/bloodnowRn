import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const CardDetail = ({ list, onPress }) => {
  //console.log({list});
  return(
    <TouchableOpacity style={styles.requestCardContainerStyle} onPress={onPress}>
      <Image
        style={styles.imageRequestStyle}
        source={{ uri: list.thumbnail_image }}
      />
      <Text style={[styles.detailRequestStyle]}>
        {list.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  requestCardContainerStyle: {
    marginTop: 15,
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageRequestStyle: {
    marginLeft: 10,
    marginTop: 10,
    height: 80,
    width: 80,
  },
  detailRequestStyle: {
    paddingLeft: 20,
  },
});

export {CardDetail};
