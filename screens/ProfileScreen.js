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
import Expo,{ Font } from 'expo'
import { NavigationActions } from 'react-navigation';
import { TestButton, NavigatorBackground,ExNavigationState, ProfileBox, CardList } from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';
import addressServer from '../utilities/addressServer';
import axios from 'axios'

export default class ProfileScreen extends Component {
  static navigationOptions =  {
    title: 'โปรไฟล์',
    //headerBackTitle: 'โปรไฟล์',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  componentWillMount() {
    AsyncStorage.getItem('@loginData:key')
    .then((loginStatus) => {
      const temp = JSON.parse(loginStatus)
      this.state.token = temp.token
      console.log(addressServer.APIRequest.toString() + '/api/index');
      const api = addressServer.APIRequest.toString() + '/api/index';
      axios(api,{ headers: {'Authorization' : 'Bearer ' + temp.token},})
        .then(response =>
        {
          console.log(response.data.user)
          this.setState({ user: response.data.user })
          this.setState({ loading: false })
        })
        .catch((error) =>  {
          console.log(error + ' @ProfileScreen')
          this.setState({ loading: false })
        })
    })
    .catch((error) => {
      console.log(error + ' @ProfileScreen')
      this.setState({ loading: false })
    })
  }

  state = {
    user: '',
    donateHistoryURL: "http://rallycoding.herokuapp.com/api/music_albums",
    token: '',
    loading: true
  }

  render() {
    if(this.state.donateHistoryURL !== null){
      donateHistory = <CardList token={this.state.token} url={this.state.donateHistoryURL} onPress={this._goToDetailDonate} navi={this.props.navigation}/>
    }
    else{
      donateHistory = <View />
    }
    if( this.state.loading) {
      return <Expo.AppLoading />
    } else {
      return(
        <View style={{paddingTop:15,flex:1,backgroundColor:'white'}}>
          <ProfileBox
            user={this.state.user}
            navigation={this.props.navigation}
            onPress={this._goToEditProfile}
            logOut={this._logout}
          />
          <CmPrasanmitBoldText style={styles.donateHisotyHeader}>
            ประวัติการให้เลือด
          </CmPrasanmitBoldText>
            {donateHistory}
        </View>
      )
    }
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
