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
import { Router } from '../navigation/Router';
import { withNavigation, getNavigator } from '@expo/ex-navigation';
import { TestButton, NavigatorBackground,ExNavigationState, Button} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

@withNavigation class ExponentButton extends Component {
  _handlePress = () => {
    this.props.navigator.push('requestBlood');
  };

/*  _logOut = () => {
    this.props.navigation.performAction(({ tabs, stacks }) => {
      tabs('tab-navigation').jumpToTab('second');
    });
  };*/

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

  componentWillMount() {
    this._userData();
  }

  render() {
    return (
      <View style={{marginTop:30}}>
         <Text>HOME SCREEN</Text>
         <Button
          title='ออกจากระบบ'
          buttonColor='#9FAC9B'
          sizeFont={25}
          onPress={ () => this._logout(navigation=this.props.navigation) } //console.log(this.props.navigation)// }
          ButtonWidth={260}
          ButtonHeight={50}
          />
      </View>
    );
  }

  _logout = (navigation) => {
    //const rootNavigator = this.props.navigation.getNavigator('root');
    const rootNavigator = this.props.navigation.getNavigator('root');
    console.log(this.props);
    //console.log(navigator);
    this._clearUserData();
    //this.props.navigator.pop();
    //this.props.navigator.replace('login');
    rootNavigator.push("login");
  }

  async _clearUserData(){
    try {
      await AsyncStorage.removeItem('@userData:key');
    } catch ( error ) {
      console.log('error');
    }
  }

}
