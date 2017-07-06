import React, {Component} from 'react';
import { ScrollView, View , Text ,StyleSheet, Dimensions, Linking } from 'react-native';
import { RequestDetailInDonor, Button, Map } from '../components/common';
import Colors from '../constants/Colors';
import { Font } from 'expo';

export default class RequestDetailInDonorScreen extends Component {
  static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'รายละเอียด',
            headerTintColor: Colors.tintColor,
            headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
            headerStyle: {backgroundColor: Colors.tabBar},
            gesturesEnabled: false,
        };
    };

    state = {
        patient_name: '',
        patient_id: '',
        patient_blood: '',
        patient_blood_type: '',
        patient_bloodUnit: '',
        countblood: 0,
        patient_detail: '',
        patient_hos: '',
        patient_bloodTemp: 'A',
        patient_blood_Temp: '+',
        patient_hos_la: '',
        patient_hos_long: '',
        patient_province: 'เชียงใหม่',
        region: {
            latitude: 18.788488,
            longitude: 98.971420,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
        },
        accept: false,
    }

    render() {
      const url="http://maps.google.com/maps?daddr=("+ this.state.region.latitude + "," + this.state.region.longitude + ")";
      return(
        <ScrollView style={{flex:1, backgroundColor: 'white' }}>
          <View style={{flex: 1,width:Dimensions.get('window').width,flexDirection: 'column',alignItems: 'center'}}>
            <View style={{marginTop:15}}></View>
            <RequestDetailInDonor label='ชื่อผู้ป่วย' information='อักศร แลดูดี'/>
            <RequestDetailInDonor label='รหัสผู้ป่วย' information='14249269'/>
            <RequestDetailInDonor label='กรุ๊ปเลือด' information='O-' />
            <RequestDetailInDonor label='รายละเอียด' information='อักศรไปทำหน้า หมอจัดหนักไปหน่อยมีดแทงเข้าไปหัวใจ ไม่รู้เหมือนกันว่าไปโดยหัวใจอีศรได้ยังไง'/>
            <RequestDetailInDonor label='จังหวัด' information='เชียงใหม่'/>
            <RequestDetailInDonor label='สถานพยาบาล' information='กรุงเทพ'/>
            <Map
              width={170}
              height={170}
              region={this.state.region}
              onPress={() => Linking.openURL(url)}
            />
            <View style={{marginTop:25,flexDirection:'row'}}>
              <View style={styles.borderBottom}>
                <Button
                  title='ตอบรับ'
                  onPress={() => {}}
                  buttonColor='#E84A5F'
                  sizeFont={25}
                  ButtonWidth={100}
                  ButtonHeight={40}
                  colorFont='white'
                />
              </View>
              <View style={{marginLeft:15}} ></View>
              <View style={styles.borderBottom}>
                <Button
                  title='ปฏิเสธ'
                  onPress={this._backToHistory}
                  buttonColor='white'
                  sizeFont={25}
                  ButtonWidth={100}
                  ButtonHeight={40}
                  colorFont= {Colors.tabBar}
                />
              </View>
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
