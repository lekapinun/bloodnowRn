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
import { TestButton, NavigatorBackground,ExNavigationState} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import axios from 'axios';

export default class FriendScreen extends Component {
    static navigationOptions =  {
        title: 'เพื่อน',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };

    state = {
      list: [],
    }

    componentWillMount() {
      axios.get("http://rallycoding.herokuapp.com/api/music_albums")
      .then(response => this.setState({ list: response.data }));
    }

    renderList() {
      //console.log(this.state.list)
       return this.state.list.map(list =>
         <View
           key = {list.title}
           style={{ flex: 0.3, height: 80, width: 80, backgroundColor: 'brown', margin: 10}}
         />
         //<CardDetail key={list.title} list={list} visible={true}/>
       );
     }

    render() {
      return(
        <View style={{backgroundColor: 'black', flexDirection: 'row', flex: 1, width: 350, height: 200}}>
          {this.renderList()}
        </View>
    )};

}
