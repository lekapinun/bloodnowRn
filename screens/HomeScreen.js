import React, { Component } from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { Font } from 'expo'
import { TestButton, NavigatorBackground,ExNavigationState, Button} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

/*
@withNavigation class ExponentButton extends Component {
  _handlePress = () => {
    this.props.navigator.push('requestBlood');
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this._handlePress}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          paddingTop: 1,
        }}>
        <Image
          source={require('../assets/icons/exponent-icon.png')}
          style={{ width: 21, height: 17 }}
        />
      </TouchableOpacity>
    );
  }
}
*/
export default class HomeScreen extends React.Component {
  /*static route = {
    navigationBar: {
      title: 'ข้อควรรู้เกี่ยวกับการบริจาคโลหิต',
      backgroundColor: Colors.routeColor,
      titleStyle: [Font.style('CmPrasanmitBold'),{fontSize:25}],
      tintColor: 'white',
      renderRight: () => <ExponentButton />,
    },
  };*/


  async _userData(){
    try {
      const name = await AsyncStorage.getItem('@userData:key');
      let data = await JSON.parse(name);
      console.log(data.name);
      console.log(data.phone);
      console.log(data.blood + data.blood_type);
    } catch ( error ) {
      console.log('error');
    }
  }

  _logout = (navigation) => {
    const { navigate } = this.props.navigation;
    //const rootNavigator = this.props.navigation.getNavigator('root');
    //console.log(navigator);
    this._clearUserData();
    navigate('Login');
  }
    /*static route = {
        navigationBar: {
        title: 'เพื่อน',
        backgroundColor: Colors.routeColor,
        titleStyle: [Font.style('CmPrasanmitBold'),{fontSize:25}],
        tintColor: 'white',
        renderRight: () => <ExponentButton />,
        },
    };*/
    render() {
        return(
            <View style={{marginTop:30}}>
                <Text>HOME</Text>
            </View>
        );
    }

}
