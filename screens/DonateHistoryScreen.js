import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Font } from 'expo';
import Colors from '../constants/Colors';
import { CmPrasanmitText } from '../components/CmPrasanmitText';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';

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
      name: 'เคที',
      blood: 'B',
      blood_type: '+'
    },
    patient: {
      patient_name: 'จอห์น เมเยอร์',
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
      patient_timestamp: '19/09/69, 12:30',
    }
  }

  render() {
    return (
      <View style={{ flex: 1,backgroundColor: 'white'}}>
        <View style={styles.receiverProfileContainer}>
          <View style={{ height: 70, width: 70,
          marginLeft: 25,}}>
            <Image
              style={styles.profileImageStyle}
              source={{uri: "http://www.japanstyle.info/wordpress/wp-content/images/henohenomoheji.bmp"}}
            />
            <View style={styles.bloodTypeContainer}>
              <CmPrasanmitText style={{ color: 'white'}}>
                {this.state.receiver.blood + this.state.receiver.blood_type}
              </CmPrasanmitText>
            </View>
          </View>
          <View style={styles.requestInfotmationContainer}>
            <View style={styles.requestInformationStyle}>
              <CmPrasanmitBoldText style={{marginLeft: 20, fontSize: 25, height:25, color: 'black',}}>
                จาก
              </CmPrasanmitBoldText>
              <CmPrasanmitText  style={{marginLeft: 15, fontSize: 23, height:25, color: 'black',}}>
                {this.state.receiver.name}
              </CmPrasanmitText>
            </View>
            <CmPrasanmitText style={{ marginLeft: 15, fontSize: 18, color: 'grey' }}>
              {this.state.patient.patient_timestamp}
            </CmPrasanmitText>
          </View>
        </View>

        <View style={styles.patientInfoContainer}>
          <View style={styles.underline}>
            <CmPrasanmitBoldText style={styles.title}>
              ชื่อผู้ป่วย
            </CmPrasanmitBoldText>
            <CmPrasanmitText style={styles.informationText}>
              {this.state.patient.patient_name}
            </CmPrasanmitText>
          </View>

          <View style={styles.underline}>
            <CmPrasanmitBoldText style={styles.title}>
              รหัสผู้ป่วย
            </CmPrasanmitBoldText>
            <CmPrasanmitText style={styles.informationText}>
              {this.state.patient.patient_id}
            </CmPrasanmitText>
          </View>

          <View style={styles.underline}>
            <CmPrasanmitBoldText style={styles.title}>
              กรุ๊ปเลือด
            </CmPrasanmitBoldText>
            <CmPrasanmitText style={styles.informationText}>
              {this.state.patient.patient_blood + this.state.patient.patient_blood_type}
            </CmPrasanmitText>
          </View>

          <View style={styles.underline}>
            <CmPrasanmitBoldText style={styles.title}>
              จังหวัด
            </CmPrasanmitBoldText>
            <CmPrasanmitText style={styles.informationText}>
              {this.state.patient.patient_province}
            </CmPrasanmitText>
          </View>

          <View style={styles.underline}>
            <CmPrasanmitBoldText style={styles.title}>
              สถานพยาบาล
            </CmPrasanmitBoldText>
            <CmPrasanmitText style={styles.informationText}>
              {this.state.patient.patient_hos}
            </CmPrasanmitText>
          </View>

          <View style={styles.underline}>
            <CmPrasanmitBoldText style={styles.title}>
              วันที่บริจาค
            </CmPrasanmitBoldText>
            <CmPrasanmitText style={styles.informationText}>
              {this.state.donateDate}
            </CmPrasanmitText>
          </View>

          <View style={styles.underline}>
            <CmPrasanmitBoldText style={styles.title}>
              คำขอบคุณ*
            </CmPrasanmitBoldText>
            <CmPrasanmitText style={styles.informationText}
            numberOfLines={5} >
              {this.state.patient.patient_thankyou}
            </CmPrasanmitText>
          </View>
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
