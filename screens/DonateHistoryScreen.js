import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Font } from 'expo';
import Colors from '../constants/Colors';
import { CmPrasanmitText } from '../components/CmPrasanmitText';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';
import { RequestDetailInDonor  } from '../components/common';

export default class DonateHistoryScreen extends Component {
  static navigationOptions =  {
    title: 'รายละเอียด',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  state = {
    donateDate: '5/5/55',
    receiver: {
      name: 'Lautner',
      blood: 'A',
      blood_type: '+'
    },
    patient: {
      patient_name: 'เทย์เลอร์ เลาต์เนอร์',
      patient_id: '231313',
      patient_blood: 'A',
      patient_blood_type: '+',
      //patient_bloodUnit: '',
      //countblood: 0,
      //patient_detail: '',
      patient_hos: 'โรงพยาบาลลลลลล',
      //patient_hos_la: '',
      //patient_hos_long: '',
      patient_province: 'เชียงใหม่',
      patient_thankyou: 'ขอบคุณ',
      patient_timestamp: '19/02/2017',
    }
  }

  render() {
    var height_detail = 51
    return (
      <View style={{ flex: 1,backgroundColor: 'white'}}>
        <View style={styles.receiverProfileContainer}>
          <View style={{ height: 70, width: 70,marginLeft: 25,}}>
            <Image
              style={styles.profileImageStyle}
              source={{uri: 'http://images.boomsbeat.com/data/images/full/6954/tayl-png.png'}}
            />
            <View style={styles.bloodTypeContainer}>
              <CmPrasanmitText style={{ color: 'white'}}>
                {this.state.receiver.blood + this.state.receiver.blood_type}
              </CmPrasanmitText>
            </View>
          </View>
          <View style={styles.requestInfotmationContainer}>
            <View style={styles.requestInformationStyle}>
              {/* <CmPrasanmitText  style={{marginLeft: 20, fontSize: 25, height:25, color: 'black',}}>คุณ</CmPrasanmitText>
              <CmPrasanmitText style={{marginLeft: 0, fontSize: 25, height:25, color: 'black',}}>ตอบรับ </CmPrasanmitText> */}
              <CmPrasanmitText  style={{marginLeft: 20, fontSize: 25, height:25, color: 'black',}}>{this.state.receiver.name}</CmPrasanmitText>
            </View>
            {/* <CmPrasanmitText style={{ marginLeft: 20, fontSize: 18, color: 'grey' }}>
              {this.state.patient.patient_timestamp}
            </CmPrasanmitText> */}
          </View>
        </View>

        <View style={styles.patientInfoContainer}>
          <RequestDetailInDonor label='ชื่อผู้ป่วย' information={this.state.patient.patient_name} height={height_detail}/>
          <RequestDetailInDonor label='รหัสผู้ป่วย' information={this.state.patient.patient_id} height={height_detail}/>
          <RequestDetailInDonor label='กรุ๊ปเลือด' information={this.state.patient.patient_blood + this.state.patient.patient_blood_type} height={height_detail}/>
          <RequestDetailInDonor label='จังหวัด' information={this.state.patient.patient_province} height={height_detail}/>
          <RequestDetailInDonor label='สถานพยาบาล' information={this.state.patient.patient_hos} height={height_detail}/>
          <RequestDetailInDonor label='วันที่บริจาค' information={this.state.donateDate} height={height_detail}/>
          <RequestDetailInDonor label='คำขอบคุณ' information={this.state.patient.patient_thankyou} height={height_detail}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  receiverProfileContainer: {
    marginTop: 15,
    flexDirection: 'row',
    height: 90,
    width: 320,
    borderColor: Colors.tabBar,
    borderWidth: 2,
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

/*
*/
