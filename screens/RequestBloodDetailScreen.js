import React, {Component} from 'react';
import { ScrollView, View , Text ,StyleSheet, Dimensions, Linking,AsyncStorage } from 'react-native';
import { RequestDetailInDonor, Button, Map } from '../components/common';
import Colors from '../constants/Colors';
import { Font } from 'expo';
import addressServer from '../utilities/addressServer';
import axios from 'axios'

export default class RequestBloodDetailScreen extends Component {
  static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        /*console.log('params')
        console.log(params)
        console.log(params)
        console.log(params)*/
        return {
            title: 'รายละเอียด',
            headerTintColor: Colors.tintColor,
            headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
            headerStyle: {backgroundColor: Colors.tabBar},
            gesturesEnabled: false,
        };
    };

    state = {
      detail_id : 0,
      token : '',
      data : ''
    }

    componentWillMount() {
      this.state.detail_id = this.props.navigation.state.params
      AsyncStorage.getItem('@loginData:key')
      .then((loginStatus) => {
        const temp = JSON.parse(loginStatus)
        this.state.token = temp.token
        console.log(addressServer.APIRequest + '/api/req/detail');
        const api = addressServer.APIRequest + '/api/req/detail';
        axios(api,{ 
          method: 'post', 
          headers: {'Authorization' : 'Bearer ' + this.state.token},
          data: { 'roomreq_id': this.state.detail_id }
        })
          .then(response => {
            this.setState({data: response.data[0]})
            var date = response.data[0].updated_at.split(' ')[0]
            date = date.split('-')
            var dateTime = new Date(date[1] + '/' + date[2] + '/' + date[0])
            var dateTime_exp = new Date( dateTime.getTime() + (86400000 * 3) )
            dateTime = dateTime.getDate() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getFullYear()
            dateTime_exp = dateTime_exp.getDate() + '/' + (dateTime_exp.getMonth() + 1) + '/' + dateTime_exp.getFullYear()
            console.log(dateTime)
            console.log(dateTime_exp)
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    }

    _renderButton() {
      return(
        <View style={{marginTop:10,marginBottom:10}}>
          <Button
            title='คำขอเสร็จสิ้น'
            onPress={this._backToHistory}
            buttonColor='#E84A5F'
            sizeFont={25}
            ButtonWidth={150}
            ButtonHeight={50}
            colorFont= 'white'
          />
        </View>
      );
    }

    render() {
      var height_detail = 55
      return(
        <ScrollView style={{flex:1, backgroundColor: 'white' }}>
          <View style={{flex: 1,width:Dimensions.get('window').width,flexDirection: 'column',alignItems: 'center'}}>
            <View style={{marginTop:20}}></View>
            <RequestDetailInDonor label='ชื่อผู้ป่วย' information={this.state.data.patient_name} height={height_detail}/>
            <RequestDetailInDonor label='รหัสผู้ป่วย' information={this.state.data.patient_id} height={height_detail}/>
            <RequestDetailInDonor label='กรุ๊ปเลือด' information={this.state.data.patient_blood + this.state.data.patient_blood_type} height={height_detail}/>
            <RequestDetailInDonor label='จังหวัด' information={this.state.data.patient_province} height={height_detail}/>
            <RequestDetailInDonor label='สถานพยาบาล' information={this.state.data.patient_hos} height={height_detail}/>
            <RequestDetailInDonor label='วันที่ขอบริจาค' information='06/06/2560' height={height_detail}/>
            <RequestDetailInDonor label='วันที่สื้นสุด' information='08/06/2560' height={height_detail}/>
            <RequestDetailInDonor label='จำนวนที่บริจาค' information={this.state.data.countblood} height={height_detail}/>
            <View style={{marginTop:25,flexDirection:'row'}}>
              {this._renderButton()}
            </View>
          </View>
        </ScrollView>
      );}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerText: {
    paddingLeft:10,
    fontSize: 25,
  },
  borderBottom: {
    borderColor: Colors.tabBar,
    borderWidth: 1,
  },
});
