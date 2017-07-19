import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Font } from 'expo';
import { PickerModalDate, BaseButton } from '../components/common';
import { CmPrasanmitBoldText, CmPrasanmitText } from '../components';
import Colors from '../constants/Colors'
import axios from 'axios'
import addressServer from '../utilities/addressServer';

export default class ManualDonateScreen extends Component {
  static navigationOptions =  {
    title: 'แก้ไข',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {backgroundColor: Colors.tabBar},
    gesturesEnabled: false,
  };

  componentWillMount() {
    this.setState({token : this.props.navigation.state.params.token})
    var date = this.props.navigation.state.params.last_donate.split('/')
    date = date[1] + '/' + date[0] + '/' + date[2]
    this.setState({date_donate : new Date(date),tmpDate: new Date(date)})
  }

  state = {
    modalVisible: false,
    tmpDate: new Date(),
    date_donate: '',
    token : ''
  }

  render() {

    let recentDate;
    if(this.state.date_donate !== ''){
      recent = this.state.date_donate;
      recentDate = <Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{recent.getDate().toString() + '/' +(recent.getMonth()+1).toString() + '/' + recent.getFullYear().toString()}</Text>
    }else{
      recentDate = <Text />
    }
    return(
      <View style={{backgroundColor: 'white', flex: 1, }}>
        <PickerModalDate
          pickerVisible={this.state.modalVisible}
          onPressCancel={() => { this.setState({modalVisible: !this.state.modalVisible}) }}
          onPressSubmit={() => {
            this.setState({ date_donate: this.state.tmpDate})
            this.setState({modalVisible: !this.state.modalVisible})
          } }
          selectOne={this.state.tmpDate}
          onChangeOne={ tmpDate => this.setState({ tmpDate }) }
        />
        <View style={{ width: 320, marginTop:35, alignSelf: 'center'}}>
          <CmPrasanmitBoldText style={{ color:Colors.textgrey, fontSize: 25,marginBottom:10}}>วันบริจาคครั้งล่าสุด</CmPrasanmitBoldText>
          <TouchableOpacity onPress={() => this.setState({ modalVisible: true})}>
            <View style={{ height: 30, marginVertical: 15, borderBottomWidth: 1, borderColor: Colors.textgreydetail, justifyContent: 'flex-end'}}>
                {recentDate}
            </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:10}}>  
              <CmPrasanmitText style={{ color: Colors.textgreydetail, fontSize: 21, flex:2.7}}>โปรดทราบ : </CmPrasanmitText>
              <CmPrasanmitText style={{ color: Colors.textgreydetail, fontSize: 21, flex:7.3}}>
                คุณจะไม่สามารถแก้ไขวันบริจาคล่าสุดในช่วง 3 วันนับจากนี้
              </CmPrasanmitText>
            </View>
            <BaseButton
              title="บันทึกการเปลี่ยนแปลง"
              onPress={this._sendTime}
              fontStyle={[Font.style('CmPrasanmit'),{fontSize:23,color:'white'}]}
              ButtonStyle={{backgroundColor: Colors.tabBar,height:40,width:300,marginTop:50}}
            /> 
        </View>
          
        </View>
      )
    }

    _sendTime = () => {
      var temp_time = this.state.date_donate
      temp_time = temp_time.getFullYear().toString() + '-' + (temp_time.getMonth()+1).toString() + '-' + temp_time.getDate().toString()
      console.log(addressServer.APIRequest.toString() + '/api/user/settime');
      const api = addressServer.APIRequest.toString() + '/api/user/settime';
      axios(api, { 
        method: 'post', 
        data : {'last_date_donate' : temp_time} ,
        headers: {'Authorization' : 'Bearer ' + this.state.token},
      })
      .then(() => {
        console.log('SetTime')
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Donor'}) 
          ]
        })
        this.props.navigation.dispatch(resetAction)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    pickerText: {
      paddingLeft:10,
      fontSize: 25,
      color: Colors.textgrey
    }
  });
