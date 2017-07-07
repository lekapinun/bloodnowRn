import React, {Component} from 'react';
import { ScrollView, View , Text ,StyleSheet, Dimensions, Linking } from 'react-native';
import { RequestDetailInDonor, Button, Map } from '../components/common';
import Colors from '../constants/Colors';
import { Font } from 'expo';

export default class RequestBloodDetailScreen extends Component {
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

    }

    render() {
      return(
        <ScrollView style={{flex:1, backgroundColor: 'white' }}>
          <View style={{flex: 1,width:Dimensions.get('window').width,flexDirection: 'column',alignItems: 'center'}}>
            <View style={{marginTop:20}}></View>
            <RequestDetailInDonor label='ชื่อผู้ป่วย' information='อักศร แลดูดี'/>
            <RequestDetailInDonor label='รหัสผู้ป่วย' information='14249269'/>
            <RequestDetailInDonor label='กรุ๊ปเลือด' information='O-' />
            <RequestDetailInDonor label='จังหวัด' information='เชียงใหม่'/>
            <RequestDetailInDonor label='สถานพยาบาล' information='กรุงเทพ'/>
            <RequestDetailInDonor label='วันที่ขอบริจาค' information='06/06/2560'/>
            <RequestDetailInDonor label='วันที่สื้นสุด' information='08/06/2560'/>
            <RequestDetailInDonor label='จำนวนที่บริจาค' information='10 ถุง'/>
            <View style={{marginTop:25,flexDirection:'row'}}>
                <Button
                  title='ส่งคำขออีกครั้ง'
                  onPress={() => {}}
                  buttonColor='#F6B6BF'
                  sizeFont={25}
                  ButtonWidth={150}
                  ButtonHeight={50}
                  colorFont='white'
                />
              <View style={{marginLeft:15}} ></View>
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
