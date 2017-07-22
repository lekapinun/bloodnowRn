import React from 'react';
import Expo, { Font } from 'expo';
import { AppRegistry, View, ActivityIndicator } from 'react-native';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import { FontAwesome } from '@expo/vector-icons';
import Stack from './navigator/mainStack';


export default class App extends React.Component{
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    cacheAssetsAsync({
      images: [
        require('./assets/images/expo-wordmark.png'),
        require('./assets/icons/logo.png'),
        require('./assets/images/expo-icon@2x.png'),
        require('./assets/icons/cr.png'),
        require('./assets/icons/ex.png'),
        require('./node_modules/react-navigation/src/views/assets/back-icon.png'),
        require('./assets/images/Ap.png'),
        require('./assets/images/An.png'),
        require('./assets/images/ABp.png'),
        require('./assets/images/ABn.png'),
        require('./assets/images/On.png'),
        require('./assets/images/Op.png'),
        require('./assets/images/Bp.png'),
        require('./assets/images/Bn.png'),
        require('./assets/images/refresh.png'),
        require('./assets/images/envelope.png'),
        require('./assets/images/camera.png'),
        require('./assets/icons/check.png'),
        require('./assets/icons/uncheck.png'),
        require('./assets/images/addRequest.png'),
        require('./assets/images/cm.png'),
        require('./assets/images/user.png'),
        require('./assets/images/error.png'),
        require('./assets/images/conf.png'),
        require('./assets/images/intro12.png'),
        require('./assets/images/keyboard-right-arrow-button.png'),
        require('./assets/images/intro1v3.png'),
        require('./assets/images/intro2v6.png')
      ],
      fonts: [
        FontAwesome.font,
        { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        { 'CmPrasanmit': require('./assets/fonts/CmPrasanmit.ttf') },
        {  'CmPrasanmitBold': require('./assets/fonts/CmPrasanmitBold.ttf') },
      ],
    })
    .then(() => {
      this.setState({ appIsReady: true });
    })
    .catch(( error ) => {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(error.message);
    })
  }

  render() {
    return this.state.appIsReady ? <Stack/> : <Loading/>
  }
}

const Loading = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large" />
    </View>
  )
}

