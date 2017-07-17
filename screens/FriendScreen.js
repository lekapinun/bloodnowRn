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
import { TabNavigator } from 'react-navigation';
import { Font } from 'expo'
import { TestButton, NavigatorBackground,ExNavigationState} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import HomeScreen from './HomeScreen';
import axios from 'axios'
import addressServer from '../utilities/addressServer';

export default class FriendScreen extends Component {
    static navigationOptions =  {
        title: 'เพื่อน',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };

    componentWillMount() {
        this.showFirstContactAsync()
    }

    state = {
        phoneList : [],
        token : '',
        loadfriend : false
    }

    async showFirstContactAsync() {
        const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
        if (permission.status !== 'granted') {
            // Permission was denied...
            return;
        }
        Expo.Contacts.getContactsAsync({
            fields: [
            Expo.Contacts.PHONE_NUMBERS,
            Expo.Contacts.EMAILS,
            ],
            pageSize: 200,
            pageOffset: 0,
        })
        .then((contacts) => {
            var temp = 0
            var phonelist = []
            for (var i = 0; i < contacts.data.length; i++) {
                if( contacts.data[i].phoneNumbers[0] !== undefined) {
                    for (var j = 0; j < contacts.data[i].phoneNumbers.length; j++) {
                        if(contacts.data[i].phoneNumbers[j].digits.search('[+]66') !== -1){
                            phonelist[temp++] = '0' + contacts.data[i].phoneNumbers[j].digits.substring(3)
                        } else {
                            phonelist[temp++] = contacts.data[i].phoneNumbers[j].digits
                        }     
                    }   
                } 
            }
             this._addFriend(phonelist)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    _addFriend = (friends) => {
        //console.log(friends)
        AsyncStorage.getItem('@loginData:key')
        .then((loginStatus) => {
            const temp = JSON.parse(loginStatus)
            this.state.token = temp.token
            console.log(addressServer.APIRequest.toString() + '/api/friend');
            const api = addressServer.APIRequest.toString() + '/api/friend';
             axios(api, { 
                method: 'post', 
                headers: {'Authorization' : 'Bearer ' + this.state.token},
                data : { 'friend' : friends}
            })
            .then((response) => {
                console.log(response.data)
                this.setState({loadfriend : true})
            })
            .catch((error) => {
                console.log(error)
                this.setState({loadfriend : true})
            }) 
        })
        .catch((error) => {
            console.log(error)
            this.setState({loadfriend : true})
        })
    }

    render() {
      const FriendTab = TabNavigator(
        {
          ALL: {screen: HomeScreen},
          A: {screen: HomeScreen},
          B: {screen: HomeScreen},
          O: {screen: HomeScreen},
          AB: {screen: HomeScreen},
        },{
          ...TabNavigator.Presets.AndroidTopTabs,
          tabBarOptions:{
            activeTintColor: Colors.tabBar,
            inactiveTintColor: 'grey',
            indicatorStyle: {
              borderBottomColor: Colors.tabBar,
              borderBottomWidth: 3,
            },
            labelStyle: [Font.style('CmPrasanmitBold'),{
              fontSize: 25,
              marginTop: 0
            }],
            style: {
              backgroundColor: 'white',
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.tabBar,
              height: 40
            },
          }
        });

        return(
          <FriendTab screenProps="A"/>
        );

      }

}
