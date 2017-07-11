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
    headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  state = {
    donateHistoryURL: "http://rallycoding.herokuapp.com/api/music_albums",
    list: {
      title: "test",
      bloodType: "O",
      thumbnail_image: "http://www.japanstyle.info/wordpress/wp-content/images/henohenomoheji.bmp"
    },
  }

  render() {
    if(this.state.donateHistoryURL !== null){
      donateHistory = <CardList url={this.state.donateHistoryURL} onPress={() => {
        const resetAction = NavigationActions.reset(
          {
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Profile'}) ,
              NavigationActions.navigate({ routeName: 'DonateHistory'})
            ]
          }
        )
        this.props.navigation.dispatch(resetAction)
      }}/>
    }
    else{
      donateHistory = <View />
    }
    return(
      <View style={{marginTop:30,}}>
        <ProfileBox
          list={this.state.list}
          navigation={this.props.navigation}
          onPress={() => {
            const resetAction = NavigationActions.reset(
              {
                index: 1,
                actions: [
                  NavigationActions.navigate({ routeName: 'Profile'}) ,
                  NavigationActions.navigate({ routeName: 'EditProfile'})
                ]
              }
            )
            this.props.navigation.dispatch(resetAction)
          }}
        />

        <CmPrasanmitBoldText style={styles.donateHisotyHeader}>
          ประวัติการให้เลือด
        </CmPrasanmitBoldText>

        {donateHistory}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  donateHisotyHeader: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 23,
  },
});
