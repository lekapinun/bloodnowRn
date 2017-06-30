import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const NavigatorBackground = () => {
  const {backgroundStyle, imageStyle} = styles;

  return (
    <View style={backgroundStyle}>
      <Image
        style={imageStyle}
        source={require('../../assets/icons/logo.png')}
        resizeMode={'cover'}
      />
    </View>
  );
}

const styles =  StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '0.2%'
  },
  imageStyle: {
     width: 100,
     height: 45,
  },
});

export {NavigatorBackground};
