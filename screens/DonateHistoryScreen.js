import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Expo, { Font } from 'expo';
import Colors from '../constants/Colors';
import { CmPrasanmitText } from '../components/CmPrasanmitText';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';
import { RequestDetailInDonor, Loading  } from '../components/common';
import addressServer from '../utilities/addressServer';
import axios from 'axios';

export default class DonateHistoryScreen extends Component {
  static navigationOptions =  {
    title: 'รายละเอียด',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  componentWillMount() {
    var params = this.props.navigation.state.params
    //console.log(params)
    console.log(addressServer.APIRequest + '/api/user/donate/detail');
    const api = addressServer.APIRequest + '/api/user/donate/detail';
     axios(api,{ 
      method: 'post', 
      headers: {'Authorization' : 'Bearer ' + params.token},
      data: {'roomreq_id' : params.detail_id}
    })
    .then(response =>
    {
      console.log(response.data)
      this.setState({patient : response.data[0]})
      var date = response.data[0].created_at.split(' ')[0]
      date = date.split('-')
      var dateTime = date[2] + '/' + date[1] + '/' + date[0]
      this.setState({donateDate: dateTime}) 
      this.setState({loading: false})
    })
    .catch((error) =>  {
      console.log(error.toString() + ' @DonateHistoryScreen')
      this.setState({ loading: false })
    }) 
  }

  state = {
    donateDate: '',
    receiver: {
      name: 'Lautner',
      blood: 'A',
      blood_type: '+'
    },
    patient: '',
    loading: true,
    img : this.props.navigation.state.params.img
  }

  render() {
    var height_detail = 51
    if( this.state.loading ) {
      return <Loading />
    }
    return (
      <View style={{ flex: 1,backgroundColor: 'white'}}>
        <CmPrasanmitBoldText style={{height:28,marginTop:12,marginLeft:28,fontSize:25,color:Colors.tabBar}}>ผู้ส่งคำขอ</CmPrasanmitBoldText>
        <View style={styles.receiverProfileContainer}>
          <View style={{ height: 70, width: 70,marginLeft: 25,}}>
            <Image
              style={styles.profileImageStyle}
              source={{uri: this.state.img}}
            />
          </View>
          <View style={styles.requestInfotmationContainer}>
            <View>
              <CmPrasanmitText  style={{marginLeft: 20, fontSize: 25, height:25, color: 'black',}}>{capitalizeFirstLetter(this.state.patient.name)}</CmPrasanmitText>
              {this.state.patient.patient_thankyou !== null && <CmPrasanmitText style={{marginLeft: 20, fontSize: 21,width:190,color:Colors.textgreydetail}}>{this.state.patient.patient_thankyou}</CmPrasanmitText > }
            </View>
          </View>
        </View>

        <View style={styles.patientInfoContainer}>
          <RequestDetailInDonor label='ชื่อผู้ป่วย' information={this.state.patient.patient_name} height={height_detail}/>
          <RequestDetailInDonor label='รหัสผู้ป่วย' information={this.state.patient.patient_id} height={height_detail}/>
          <RequestDetailInDonor label='กรุ๊ปเลือด' information={this.state.patient.patient_blood + this.state.patient.patient_blood_type} height={height_detail}/>
          <RequestDetailInDonor label='จังหวัด' information={this.state.patient.patient_province} height={height_detail}/>
          <RequestDetailInDonor label='สถานพยาบาล' information={this.state.patient.patient_hos} height={height_detail}/>
          <RequestDetailInDonor label='วันที่บริจาค' information={this.state.donateDate} height={height_detail}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  receiverProfileContainer: {
    marginTop: 5,
    flexDirection: 'row',
    //height: 120,
    paddingVertical : 10,
    width: 320,
    borderColor: Colors.tabBar,
    borderWidth: 2,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
  },
  bloodTypeContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: Colors.tabBar,
    width: 30,
    alignItems: 'center',
    borderRadius: 5,
  },
  requestInformationStyle: {
    flexDirection: 'row',
  },
  patientInfoContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  underline : {
    flexDirection: 'row',
    width: 310,
    borderBottomColor: '#D1D1D1',
    borderBottomWidth: 1,
    justifyContent: 'space-between'
  },
  title:{
    marginVertical: 7,
    fontSize: 23,
    width: 100,
    //height:25,
    color: '#575757',
  },
  informationText: {
  marginVertical: 7,
    textAlign: 'right',
    width: 200,
    //alignSelf: 'flex-end',
    //height: 25,
    fontSize: 23,
    color: 'grey',
  }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
