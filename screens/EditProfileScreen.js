import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CmPrasanmitText } from '../components/CmPrasanmitText';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';
import { EditProfileDetail, Button } from '../components/common/';
import Colors from '../constants/Colors';

export default class EditProfileScreen extends Component{
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
        <View style={styles.pageStyle}>
          <View>
            <Image
              style={styles.imageStyle}
              source={{uri: "http://www.japanstyle.info/wordpress/wp-content/images/henohenomoheji.bmp"}}
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

          <EditProfileDetail label = "ชื่อ-สกุล" information={this.state.name} editable={false}/>
          <EditProfileDetail label = "กรุ๊ปเลือด" information= {this.state.bloodType} />
          <EditProfileDetail label = "เบอร์โทรศัพท์" information= {this.state.phone} editable={false}/>
          <EditProfileDetail label = "อีเมล์" information= {this.state.email}/>
          <EditProfileDetail label = "จังหวัด" information= {this.state.province}/>
          <EditProfileDetail label = "ปีเกิด" information= {this.state.birthYear}/>

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
      );
    }
}

const styles = StyleSheet.create({
  pageStyle: {
    marginTop: 15,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  changeProfileImageButton: {
    //paddingVertical: 2,
    height: 25,
    width: 25,
  },
  changeProfileImageButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 40,
    width: 40,
    backgroundColor: Colors.tabBar,
    borderRadius: 20,
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
