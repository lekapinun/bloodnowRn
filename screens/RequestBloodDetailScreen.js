import React, {Component} from 'react';
import { ScrollView, View , Text ,StyleSheet, Dimensions, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { RequestDetailInDonor, Button, Map } from '../components/common';
import Colors from '../constants/Colors';
import { Font } from 'expo';
import addressServer from '../utilities/addressServer';
import axios from 'axios'
import { CmPrasanmitText } from '../components/CmPrasanmitText'
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText'

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
      data : '',
      date_rem : 0,
      complete : true,
      time: '',
      time_exp: '',
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
            if( response.data[0].patient_status !== 'complete') { 
              this.setState({complete : false})
            } 
            this.setState({data: response.data[0]})
            var date = response.data[0].updated_at.split(' ')[0]
            date = date.split('-')
            var dateTime = new Date(date[1] + '/' + date[2] + '/' + date[0])
            var temp_time = Math.floor((new Date().getTime() - dateTime.getTime())/(86400000)) 
            this.setState({date_rem: temp_time})
            var dateTime_exp = new Date( dateTime.getTime() + (86400000 * 3) )
            dateTime = dateTime.getDate() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getFullYear()
            dateTime_exp = dateTime_exp.getDate() + '/' + (dateTime_exp.getMonth() + 1) + '/' + dateTime_exp.getFullYear()
            this.setState({time : dateTime, time_exp: dateTime_exp})
            //console.log(dateTime)
            //console.log(dateTime_exp)
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    }

    _renderButtonFinish() {
      if(this.state.complete === false){
        return(
          <View style={[styles.borderBottom,{marginLeft:10,marginRight:10}]}>
            <Button
              title='คำขอเสร็จสิ้น'
              onPress={this._backToHistory}
              buttonColor='#E84A5F'
              sizeFont={20}
              ButtonWidth={140}
              ButtonHeight={35}
              colorFont= 'white'
            />
          </View>
        );
      }
      return null
    }

    _renderButtonRe() {
      if(this.state.date_rem > 3 && this.state.complete === false){
        return (
          <View style={[styles.borderBottom,{marginLeft:10,marginRight:10}]}>
            <TouchableOpacity 
              style={[styles.buttonStyle,{backgroundColor: 'white',width: 140, height: 35}]} 
              onPress={() => {}}
            >
              <Image
                source={require('../assets/images/refresh.png')} style={{marginRight:5,height:18,width:18}}
              />
              <Text style={[Font.style('CmPrasanmit'),{fontSize: 20,color: Colors.tabBar}]}>ส่งคำขอร้องอีกครั้ง</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return null
    }

    _renderThankBox() {
      if(this.state.complete === true){
        return (
          <View style={[styles.borderBottom,{width:300, height:85, marginTop:20,marginBottom:20,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}]}>
              <CmPrasanmitText style={{fontSize:22,marginBottom:10}}>ส่งคำขอบคุณให้กับผู้ตอบรับคำขอของคุณ</CmPrasanmitText>
              <Button
                title='คำขอบคุณ'
                onPress={() => {}}
                buttonColor='#E84A5F'
                sizeFont={20}
                ButtonWidth={80}
                ButtonHeight={30}
                colorFont= 'white'
              />  
          </View>
        );
      }
      return null  
    }

    render() {
      var height_detail = 51
      return(
        <ScrollView style={{flex:1, backgroundColor: 'white' }}>
          <View style={{flex: 1,width:Dimensions.get('window').width,flexDirection: 'column',alignItems: 'center'}}>
            {this._renderThankBox()}
            <View style={{marginTop:10}}></View>
            <RequestDetailInDonor label='ชื่อผู้ป่วย' information={this.state.data.patient_name} height={height_detail}/>
            <RequestDetailInDonor label='รหัสผู้ป่วย' information={this.state.data.patient_id} height={height_detail}/>
            <RequestDetailInDonor label='กรุ๊ปเลือด' information={this.state.data.patient_blood + this.state.data.patient_blood_type} height={height_detail}/>
            <RequestDetailInDonor label='จังหวัด' information={this.state.data.patient_province} height={height_detail}/>
            <RequestDetailInDonor label='สถานพยาบาล' information={this.state.data.patient_hos} height={height_detail}/>
            <RequestDetailInDonor label='วันที่ขอบริจาค' information={this.state.time} height={height_detail}/>
            <RequestDetailInDonor label='วันที่สื้นสุด' information={this.state.time_exp} height={height_detail}/>
            { this.state.complete === false && <RequestDetailInDonor label='จำนวนที่บริจาค' information={this.state.data.countblood + ' ถุง'} height={height_detail}/>}
            <View style={{marginTop:40,flexDirection:'row'}}>
              {this._renderButtonRe()}
              {this._renderButtonFinish()}
            </View>
          </View>
        </ScrollView>
      );
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
  },
  borderBottom: {
    borderColor: Colors.tabBar,
    borderWidth: 1,
  },
  buttonStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row'
  },
});
