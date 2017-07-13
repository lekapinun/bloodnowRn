import React, { Component } from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { Font } from 'expo'
import { NavigationActions } from 'react-navigation';
import { TestButton, NavigatorBackground,ExNavigationState, ProfileBox, CardList } from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';

export default class ProfileScreen extends Component {
  static navigationOptions =  {
    title: 'โปรไฟล์',
    //headerBackTitle: 'โปรไฟล์',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  state = {
    donateHistoryURL: "http://rallycoding.herokuapp.com/api/music_albums",
    list: {
      title: "test",
      bloodType: "O",
      thumbnail_image: "https://cache.gmo2.sistacafe.com/images/uploads/summary/image/1484/1437134731-taylor-swift-009.jpg"
    },
  }

  render() {
    if(this.state.donateHistoryURL !== null){
      donateHistory = <CardList url={this.state.donateHistoryURL} onPress={this._goToDetailDonate} navi={this.props.navigation}/>
    }
    else{
      donateHistory = <View />
    }
    return(
      <View style={{paddingTop:15,flex:1,backgroundColor:'white'}}>
        <ProfileBox
          list={this.state.list}
          navigation={this.props.navigation}
          onPress={this._goToEditProfile}
          logOut={this._logout}
        />
        <CmPrasanmitBoldText style={styles.donateHisotyHeader}>
          ประวัติการให้เลือด
        </CmPrasanmitBoldText>
          {donateHistory}
      </View>
    );
  }

  _logout = () => {
    AsyncStorage.removeItem('@loginData:key')
    .then(() => {
      console.log('logout')
    })
  }

  _goToEditProfile = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Profile'}) ,
        NavigationActions.navigate({ routeName: 'EditProfile'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  _goToDetailDonate = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Profile'}) ,
        NavigationActions.navigate({ routeName: 'DonateHistory'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

}

const styles = StyleSheet.create({
  donateHisotyHeader: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 23,
  },
});
