import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { CmPrasanmitText } from '../components/CmPrasanmitText';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';
import { EditProfileDetail, Button } from '../components/common/';
import { Font, ImagePicker } from 'expo'
import Colors from '../constants/Colors';
import addressServer from '../utilities/addressServer';
import axios from 'axios'

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
        user: this.props.navigation.state.params.user,
        birthDate: this.props.navigation.state.params.user.birthyear.toString(),
        image: this.props.navigation.state.params.user.img,
        token: this.props.navigation.state.params.token
    }

    render() {
      const showPhotos = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({});

        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

      return(
        <View style={{flex:1,backgroundColor:'white'}}> 
        <View style={styles.pageStyle}>
          <View>
            <Image
              style={styles.imageStyle}
              source={{uri: this.state.image}}
            />
            <TouchableOpacity
              onPress={showPhotos}
              style={styles.changeProfileImageButtonContainer}
              >
              <Image
                style={styles.changeProfileImageButton}
                source={require('../assets/images/camera.png')}
              />
            </TouchableOpacity>
          </View>
          <CmPrasanmitBoldText style={{marginVertical:10,fontSize:30}}>{capitalizeFirstLetter(this.state.user.name)}</CmPrasanmitBoldText >
          <EditProfileDetail label = "ชื่อ-สกุล" information={this.state.user.firstname + ' ' + this.state.user.lastname} editable={false}/>
          <EditProfileDetail label = "กรุ๊ปเลือด" information= {this.state.user.blood + this.state.user.blood_type} />
          <EditProfileDetail keyboardType='number-pad' label = "เบอร์โทรศัพท์" information= {this.state.user.phone} editable={false}/>
          <EditProfileDetail keyboardType='email-address' label = "อีเมล์" information= {this.state.user.email}/>
          <EditProfileDetail label = "จังหวัด" information= {this.state.user.province}/>
          <EditProfileDetail keyboardType='number-pad' label = "ปีเกิด" information= {this.state.birthDate}/>
          <View style={{marginTop:30}}/>
          <Button
            title="บันทึกการเปลี่ยนแปลง"
            onPress={this._editProfile}
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

    _editProfile = () => {
      console.log(addressServer.APIRequest.toString() + '/api/edit');
      const api = addressServer.APIRequest.toString() + '/api/edit';
      axios(api,{ method: 'post',headers: {'Authorization' : 'Bearer ' + this.state.token},})
      .then(response =>
      {
        console.log(response.data)
        this.props.navigation.goBack()
      })
      .catch((error) =>  {
        console.log(error + ' @EditScreen')
      })
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}