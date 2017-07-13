import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CmPrasanmitText } from '../components/CmPrasanmitText';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';
import { EditProfileDetail, Button } from '../components/common/';
import { Font } from 'expo'
import Colors from '../constants/Colors';

export default class EditProfileScreen extends Component{
    static navigationOptions =  {
      title: 'แก้ไข',
      //headerBackTitle: 'โปรไฟล์',
      headerTintColor: 'white',
      headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
      headerStyle: {backgroundColor: '#E84A5F'},
      gesturesEnabled: false,
    };

    state = {
        name: "เทย์เลอร์ สวิฟต์",
        bloodType: "O+",
        phone: "08x-xxxxxxx",
        email: "t-swizzle@gmail.com",
        province: "กรุงเทพมหานคร",
        birthYear: "2532",
    }

    render() {
      return(
        <View style={{flex:1,backgroundColor:'white'}}>
        <View style={styles.pageStyle}>
          <View>
            <Image
              style={styles.imageStyle}
              source={{uri: "https://cache.gmo2.sistacafe.com/images/uploads/summary/image/1484/1437134731-taylor-swift-009.jpg"}}
            />
            <TouchableOpacity
              onPress={() => {}}
              style={styles.changeProfileImageButtonContainer}
              >
              <Image
                style={styles.changeProfileImageButton}
                source={require('../assets/images/camera.png')}
              />
            </TouchableOpacity>
          </View>
          <CmPrasanmitBoldText style={{marginVertical:10,fontSize:30}}>Taylor</CmPrasanmitBoldText >
          <EditProfileDetail label = "ชื่อ-สกุล" information={this.state.name} editable={false}/>
          <EditProfileDetail label = "กรุ๊ปเลือด" information= {this.state.bloodType} />
          <EditProfileDetail label = "เบอร์โทรศัพท์" information= {this.state.phone} editable={false}/>
          <EditProfileDetail label = "อีเมล์" information= {this.state.email}/>
          <EditProfileDetail label = "จังหวัด" information= {this.state.province}/>
          <EditProfileDetail label = "ปีเกิด" information= {this.state.birthYear}/>
          <View style={{marginTop:30}}/>
          <Button
            title="บันทึกการเปลี่ยนแปลง"
            onPress={() => {}}
            buttonColor={Colors.tabBar}
            colorFont="white"
            sizeFont={23}
            ButtonWidth={300}
            ButtonHeight={40}
          />
        </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  pageStyle: {
    paddingTop: 20,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  changeProfileImageButton: {
    //paddingVertical: 2,
    height: 18,
    width: 18,
  },
  changeProfileImageButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 30,
    width: 30,
    backgroundColor: Colors.tabBar,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 0.5,
    height: 100,
    width: 100,
  },
});
