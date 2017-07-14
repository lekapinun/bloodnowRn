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
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Font } from 'expo';
import { TestButton, NavigatorBackground, ExNavigationState } from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import axios from 'axios';
import { NavigationActions } from 'react-navigation'
import { CmPrasanmitText } from '../components/CmPrasanmitText'
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText'
import addressServer from '../utilities/addressServer';


export default class HomeScreen extends Component {
  static navigationOptions = props => {
    return {
      tabBarLabel: props.navigation.state.key
    }
  }
  state = {
    list: [],
    loading: false,
    token: '',
  }

  componentWillMount() {
    AsyncStorage.getItem('@loginData:key')
    .then((loginStatus) => {
      const temp = JSON.parse(loginStatus)
      this.state.token = temp.token
      console.log(addressServer.APIRequest + '/api/friend');
      const api = addressServer.APIRequest + '/api/friend';
      axios(api,{ method: 'get',  headers: {'Authorization' : 'Bearer ' + this.state.token},})
      .then((response) => {
        console.log(response.data)
        this.setState({ list: response.data,loading: true })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ loading: true })
      })
    })
    .catch((error) => {
      console.log(error)
      this.setState({ loading: true })
    })
    //console.log(this.props.navigation.state.key)
    //console.log(this.props.screenProps)
    //axios.get("http://rallycoding.herokuapp.com/api/music_albums")
    //.then(response => this.setState({ list: response.data,loading: true }));
  }

  renderList() {
    return this.state.list.map(list =>
      <CardDetail
        key = {list.user_id + list.friend_id}
        list = {list}
        visible = {true}
        onPress = {() => {}}
      />
    );
  }

  render() {
    if(this.state.loading) {
      if(this.state.list.length !== 0){
        return(
          <ScrollView style={styles.requestListContainerStyle}>
            {this.renderList()}
          </ScrollView>
        )
      } else {
        return (
          <ScrollView style={[styles.requestListContainerStyle,{flexDirection: 'column'}]}>
            <View style={{width:Layout.window.width,height:Layout.window.height}}>
              <Image
                style={{marginTop:100,height:200,width:200,alignSelf:'center'}}
                source={require('../assets/images/cm.png')}
              />
              <CmPrasanmitText style={{color: '#DCDCDC',fontSize:27,marginTop:10,alignSelf:'center'}}>ไม่มีเพื่อนให้แสดง</CmPrasanmitText>
            </View>
          </ScrollView>
        )
      }
    }
    return (
      <ScrollView style={styles.requestListContainerStyle}>
        <ActivityIndicator style={{alignSelf:'center'}} size="large" />
      </ScrollView>
    )
  }
}

const CardDetail = ({ list, onPress }) => {
  _statusBox = (
    <CmPrasanmitText style={{fontSize:18,color:'#575757'}}>
      {list.title}
    </CmPrasanmitText>
  )

  return(
    <View style={styles.requestCardContainerStyle}>
        <View style={{height:78,backgroundColor:'white',flexDirection:'row'}}>
          <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
            <Image
              style={styles.imageRequestStyle}
              source={{ uri: 'http://images.boomsbeat.com/data/images/full/6954/tayl-png.png' }}
            />
            <View style={{height:15,width:30,position:'absolute',bottom:12,left:18,backgroundColor:Colors.tabBar,borderRadius:15,alignItems: 'center',justifyContent:'center'}}>
              <CmPrasanmitBoldText style={{fontSize:14,color:'white',backgroundColor:'transparent'}}>A+</CmPrasanmitBoldText>
            </View>
          </View>
          <View style={{flex:35,justifyContent: 'center',}}>
            <CmPrasanmitBoldText style={{fontSize:22,color:'#575757'}}>Lautner</CmPrasanmitBoldText>
          </View>
          <View style={{flex:14,marginRight:10,alignItems: 'center',justifyContent: 'center'}}>
            {this._statusBox}
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requestCardContainerStyle: {
    height: 78,
    width: 340,
    flexDirection: 'column',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  imageRequestStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth:0.1,
    borderColor: '#575757'
  },
  detailRequestStyle: {
    paddingLeft: 20,
  },
  requestListContainerStyle: {
    flex: 1,
    backgroundColor:'white'
  },
});
