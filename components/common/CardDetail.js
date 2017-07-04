import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Button } from './Button';

const CardDetail = ({ list, onPress, visible }) => {
  //console.log({list});
  if(visible){
  return(
    <View style={styles.requestCardContainerStyle} >
      <Image
        style={styles.imageRequestStyle}
        source={{ uri: list.thumbnail_image }}
      />
      <Text style={[styles.detailRequestStyle]}>
        {list.title}
      </Text>
      <View style={{ position: 'absolute', right: 10}}>
        <Button
          title="รายละเอียด"
          onPress={onPress}
          sizeFont={20}
        />
      </View>
    </View>
  );}
  else {
    return (
      <View />
    );}
}

const styles = StyleSheet.create({
  requestCardContainerStyle: {
    height: '30%',
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
