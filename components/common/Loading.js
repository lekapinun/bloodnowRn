import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = () => {
  return(
    <View style={{flex:1,justifyContent:'center',backgroundColor:'white',alignItems:'center'}}>
      <ActivityIndicator size="large" />
    </View>
  )
}



export { Loading }
