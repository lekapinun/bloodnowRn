import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CmPrasanmitText } from '../components/CmPrasanmitText';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';
import { EditProfileDetail, Button } from '../components/common/';

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
        <View>
          <View>
            <Image />
            <Image />
          </View>

          <EditProfileDetail label = "ชื่อ-สกุล" information={this.state.name} editable={false}/>
          <EditProfileDetail label = "กรุ๊ปเลือด" information= {this.state.bloodType}/>
          <EditProfileDetail label = "เบอร์โทรศัพท์" information= {this.state.phone} editable={false}/>
          <EditProfileDetail label = "อีเมล์" information= {this.state.email}/>
          <EditProfileDetail label = "จังหวัด" information= {this.state.province}/>
          <EditProfileDetail label = "ปีเกิด" information= {this.state.birthYear}/>

          <Button title="บันทึกการเปลี่ยนแปลง" onPress={() => {}}/>
        </View>
      );
    }
}

const styles = StyleSheet.create({

});
