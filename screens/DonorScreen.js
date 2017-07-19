import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Modal, StyleSheet, Button, Switch, AsyncStorage} from 'react-native';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation';
import { CardDetail, Countdown, PickerModalDate } from '../components/common';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { CmPrasanmitText } from '../components/CmPrasanmitText'
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText'
import axios from 'axios'
import addressServer from '../utilities/addressServer';


export default class DonorScreen extends Component {
  static navigationOptions =  {
    title: 'ให้เลือด',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  state = {
    countdownEnd: false,
    onMoreDetail: false,
    readyDonate: false,
    nextReady: 0,
    token: '',
    req: '',
    last_donate: '',
    next_donate: '',
    img: '',
    manualDonate: false,
    last_donateTemp: new Date(),
  }

  constructor(props) {
    super(props);
    console.log(props)
    setInterval(() => {
      if(this.state.nextReady > 0){
        this.setState({test : this.state.nextReady - 86400000})
      }
    }, 86400000);
  }

  componentWillMount() {
    AsyncStorage.getItem('@loginData:key')
    .then((loginStatus) => {
      const temp = JSON.parse(loginStatus)
      this.state.token = temp.token
      console.log(addressServer.APIRequest + '/api/donate');
      const api = addressServer.APIRequest + '/api/donate';
      axios(api,{
        method: 'get',
        headers: {'Authorization' : 'Bearer ' + this.state.token},
      })
      .then((response) => {
        /* console.log('adsfdsafsdafdsafdasf')
        console.log(response.data)
        console.log('adsfdsafsdafdsafdasf') */
        if(response.data.user !== null){
          this.setState({req: response.data.user[0], img: response.data.img})
        }
        console.log(response.data)
        if(response.data.last_date_donate !== null){
          var date = response.data.last_date_donate.split(' ')[0]
          date = date.split('-')
          var dateTime = new Date(date[1] + '/' + date[2] + '/' + date[0])
          var nextTime = new Date((dateTime).getTime() + (86400000*91))
          nextTime = nextTime.getDate() + '/' + (nextTime.getMonth() + 1) + '/' + nextTime.getFullYear()
          this.setState({last_donate: date[2] + '/' + date[1] + '/' + date[0]})
          this.setState({next_donate: nextTime})
          this.setState({nextReady: (new Date(dateTime).getTime() + (86400000*91)) - new Date().getTime() })
          if(response.data.status === 'ready'){
            this.setState({readyDonate: true})
          }
        } else {
          this.setState({last_donate : '', nextReady : 0})
        }
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    let status_donate
    if((new Date()).getFullYear() - (new Date(this.state.nextReady)).getFullYear() < 1){
      status_donate = 'การบริจาคครั้งถัดไป วันที่ ' + this.state.next_donate
    } else {
      status_donate = 'ตอนนี้คุณสามารถบริจาคได้แล้ว'
    }
    return(
      <View style={[styles.center, {height:Layout.window.height,flex:1,paddingTop:16,backgroundColor:'white'}]}>
        {/*<PickerModalDate
          pickerVisible = {this.state.modalDateVisible}
          onPressCancel = {() => { this.setModalDateVisible(!this.state.modalDateVisible) }}
          onPressSubmit = {() => {
            this.setState({last_donate: this.state.last_donateTemp});
            this.setModalDateVisible(!this.state.modalDateVisible);
          }}
          selectOne = {this.state.last_donateTemp}
          onChangeOne = {date => this.setState({ last_donate: date })}
        />*/}
        <Countdown
          recentDonateDate={this.state.last_donate}
          last_donate={this.state.last_donate}
          manualModal={this._goToManualDonate}
          disableManual={this.state.manualDonate}
        />

        <View style={[styles.Border,{alignItems: 'center', flexDirection: 'column',justifyContent:'space-around'}]}>
          <View />
          <CmPrasanmitText style={{color: Colors.tabBar,fontSize:28}}>{status_donate}</CmPrasanmitText>
          <View style={{flexDirection: 'row'}}>
            <CmPrasanmitText style={{color: '#575757',fontSize:25}}>คุณพร้อมบริจาคหรือไม่?</CmPrasanmitText>
            <View style={{marginLeft:20}}></View>
            <Switch
              onTintColor={Colors.tabBar}
              value={this.state.readyDonate}
              onChange={() => {
                //if(this.state.nextReady <= 0){
                this.setState({readyDonate: !this.state.readyDonate})
                this._updateReady()
                //}
              }} />
            </View>
            <View />
          </View>

          <CardDetail
            list={this.state.req}
            onPress={this._goToDetail}
            visible={this.state.readyDonate}
            gropBlood={this.state.req.patient_blood + this.state.req.patient_blood_type}
            ready={this.state.nextReady <= 0}
            img={this.state.img}
          />

        </View>
      );
    }

    _updateReady = () => {
      console.log(addressServer.APIRequest + '/api/swap');
      const api = addressServer.APIRequest + '/api/swap';
      axios(api,{
        method: 'get',
        headers: {'Authorization' : 'Bearer ' + this.state.token},
      })
      /* .then(() => {

    }) */
    .catch((error) => {
      console.log(error)
    })
  }

  _goToDetail = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Donor'}) ,
        NavigationActions.navigate({ routeName: 'RequestInDonor', params: this.state.req})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  _goToManualDonate = () => {
    this.setState({ manualDonate: true })
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Donor'}) ,
        NavigationActions.navigate({ routeName: 'ManualDonate', params: {'last_donate': this.state.last_donate, token : this.state.token} })
      ]
    })
    this.props.navigation.dispatch(resetAction)
    setTimeout(() => {
      this.setState({ manualDonate: false })
    }, 500)
  }
}

const styles = StyleSheet.create({
  center: {
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center'
  },
  Border: {
    width: 340,
    height: 120,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.tabBar,
  },
});
