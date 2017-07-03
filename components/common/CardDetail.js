import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const CardDetail = ({ list }) => {
  //console.log({list});
  return(
    <TouchableOpacity style={styles.requestCardContainerStyle} onPress={() => console.log("Press")}>
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
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageRequestStyle: {
    marginLeft: 10,
    marginTop: 10,
    height: 50,
    width: 50,
  },
  detailRequestStyle: {
    paddingLeft: 20,
  },
});

export {CardDetail};
