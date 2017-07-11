import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Font } from 'expo';
import Colors from '../constants/Colors';
import { CmPrasanmitText } from '../components/CmPrasanmitText';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';

export default class DonateHistoryScreen extends Component {
  static navigationOptions =  {
    title: 'รายละเอียด',
    //headerBackTitle: 'โปรไฟล์',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  state = {
    donateDate: '5/5/55',
    receiverDetail: {
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
    }
  }

  render() {
    return (
      <View style={{ flex: 1,backgroundColor: 'white'}}>
        <View style={styles.receiverProfileContainer}>
          <Image
            style={styles.profileImageStyle}
            source={{uri: "http://www.japanstyle.info/wordpress/wp-content/images/henohenomoheji.bmp"}}
          />
          <View style={styles.requestInformationStyle}>
            <CmPrasanmitBoldText style={{marginLeft: 20, fontSize: 25, height:25, color: 'black',}}>
              จาก
            </CmPrasanmitBoldText>
            <CmPrasanmitText  style={{marginLeft: 15, fontSize: 23, height:25, color: 'black',}}>
              {this.state.receiverDetail.name}
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
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 25,
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
    height: 35,
    width: 310,
    marginVerticle: 7,
    borderBottomColor: '#D1D1D1',
    borderBottomWidth: 1,
    justifyContent: 'space-between'
  },
  title:{
    fontSize: 23,
    //height:25,
    fontColor: '#575757',
  },
  informationText: {
    textAlign: 'right',
    //alignSelf: 'flex-end',
    //height: 25,
    fontSize: 23,
    fontColor: 'grey'
  }
});

/*
*/
