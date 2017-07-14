import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, AsyncStorage,Alert } from 'react-native';
import Expo, { Font } from 'expo';
import { TestButton, NavigatorBackground,ExNavigationState, Button} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import axios from 'axios'
import addressServer from '../utilities/addressServer';

export default class FriendScreen extends Component {
    static navigationOptions =  {
        title: 'เพื่อน',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };

    componentWillMount() {
        //this.showFirstContactAsync()
        this.showFirstContactAsync()
        /* .then(() => {
            this._addFriend(this.state.phoneList)
        }) */
    }

    state = {
        phoneList : [],
        token : '',
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
            //console.log(contacts.data.length)
            for (var i = 0; i < contacts.data.length; i++) {
                if( contacts.data[i].phoneNumbers[0] !== undefined) {
                    //console.log(contacts.data[i].name )
                    for (var j = 0; j < contacts.data[i].phoneNumbers.length; j++) {
                        //console.log(contacts.data[i].phoneNumbers[j].digits ) 
                        if(contacts.data[i].phoneNumbers[j].digits.search('[+]66') !== -1){
                            phonelist[temp++] = '0' + contacts.data[i].phoneNumbers[j].digits.substring(3)
                        } else {
                            phonelist[temp++] = contacts.data[i].phoneNumbers[j].digits
                        }     
                    }   
                } 
            }
             this._addFriend(phonelist)
            //console.log(phonelist)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    _addFriend = (friends) => {
        console.log(friends)
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
                console.log('sadfadsfdsafdasfadsf')
                console.log(response.data)
                console.log('sadfadsfdsafdasfadsf')
            })
            .catch((error) => {
                console.log('sadfadsfdsafdasfadsf')
                console.log(error)
                console.log('sadfadsfdsafdasfadsf')
            }) 
        })
        .catch((error) => {
            console.log('sadfadsfdsafdasfadsf')
            console.log(error)
            console.log('sadfadsfdsafdasfadsf')
        })
    }

    render() {
        return(
            <View style={{marginTop:30}}>
                <Text>FRIENDS SCREEN</Text>
                <Button
                    title='ดูเบอร์'
                    buttonColor='#EF685E'
                    sizeFont={25}
                    onPress={this.showFirstContactAsync}
                    ButtonWidth={260}
                    ButtonHeight={50}
                    colorFont='white'
                />
            </View>
        );
    }

}