import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Keyboard, Animated, TextInput } from 'react-native';
import { CmPrasanmitText } from '../components/CmPrasanmitText';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';
import { EditProfileDetail, Button, PickerModalBlood, PickerPartTouch, PickerModalDate, PickerModalProvince } from '../components/common/';
import { Font, ImagePicker } from 'expo'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import addressServer from '../utilities/addressServer';
import { NavigationActions } from 'react-navigation';
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

    componentWillMount () {
      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
      this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
      this.positon = new Animated.ValueXY(0,0);
    }

    componentWillUnmount () {
      this.keyboardWillShowListener.remove();
      this.keyboardWillHideListener.remove();
    }

    _keyboardWillShow = () => {
      //this.setState({keyboard : true})
      this.positon = new Animated.ValueXY({ x: 0, y: 0});
      Animated.timing(this.positon,{
          toValue: { x: 0, y: -100},
          //duration: 1000
      }).start();
      this.forceUpdate();
    }

    _keyboardWillHide = () => {
      //console.log('asdfsdafsadfdsafadsf')
      //this.setState({keyboard : false})
      this.positon = new Animated.ValueXY({ x: 0, y: -100});
      Animated.timing(this.positon,{
          toValue: { x: 0, y: 0},
          //duration: 1000
      }).start();
      this.forceUpdate();
    }

    state = {
        //name: "เทย์เลอร์ สวิฟต์",
        phone: this.props.navigation.state.params.user.phone,
        email: this.props.navigation.state.params.user.email,
        province: this.props.navigation.state.params.user.province,
        provinceTemp: this.props.navigation.state.params.user.province,
        user: this.props.navigation.state.params.user,
        birthyear: this.props.navigation.state.params.user.birthyear.toString(),
        image: this.props.navigation.state.params.user.img,
        token: this.props.navigation.state.params.token,
        keyboard: false,
        blood: this.props.navigation.state.params.user.blood,
        blood_type: this.props.navigation.state.params.user.blood_type,
        bloodTemp: this.props.navigation.state.params.user.blood,
        blood_typeTemp: this.props.navigation.state.params.user.blood_type,
        modalBloodVisible: false,
        modalProvinceVisible: false,
        pressEdit : false,
    }

    setModalBloodVisible(visible) {
      this.setState({modalBloodVisible: visible});
    }

    setModalProvinceVisible(visible) {
      this.setState({modalProvinceVisible: visible});
    }

    render() {
      const showPhotos = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({});
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

      if(this.state.blood !== ''){
        blood = <Text style={[Font.style('CmPrasanmit'),{fontSize: 23,}]}>{this.state.blood + this.state.blood_type }</Text>;
      }else{
        blood = <Text />
      }


      return(
        <View style={{backgroundColor:'white',flex:1}}>
        <Animated.View style={[this.positon.getLayout(),{flex:1}]}>
        <ScrollView style={{height:Layout.window.height,backgroundColor:'white'}}> 
          <PickerModalBlood
            pickerVisible = {this.state.modalBloodVisible}
            onPressCancel = {() => { this.setModalBloodVisible(!this.state.modalBloodVisible)}}
            onPressSubmit = {() => {
              if(this.state.bloodTemp === ''){
                this.setState({blood: this.props.navigation.state.params.user.blood});
              }else{
                this.setState({blood: this.state.bloodTemp});
              }  
              if(this.state.blood_typeTemp === ''){
                this.setState({blood_type: this.props.navigation.state.params.user.blood_type});
              }else{
                this.setState({blood_type: this.state.blood_typeTemp});
              }          
              this.setModalBloodVisible(!this.state.modalBloodVisible);
            }}
            selectOne = {this.state.bloodTemp}
            onChangeOne = {(itemValue, itemIndex) => this.setState({bloodTemp: itemValue})}
            selectTwo = {this.state.blood_typeTemp}
            onChangeTwo = {(itemValue2, itemIndex2) => this.setState({blood_typeTemp: itemValue2})}
          /> 
          <PickerModalProvince
            pickerVisible = {this.state.modalProvinceVisible}
            onPressCancel = {() => { this.setModalProvinceVisible(!this.state.modalProvinceVisible) }}
            onPressSubmit = {() => {
              this.setState({province: this.state.provinceTemp});
              this.setModalProvinceVisible(!this.state.modalProvinceVisible);
            }}
            selectOne = {this.state.provinceTemp}
            onChangeOne = {(itemValue, itemIndex) => this.setState({provinceTemp: itemValue}) }
          />
          <View style={styles.pageStyle}>
            <View>
              <Image
                style={styles.imageStyle}
                source={{uri: this.state.image}}
              />
              <TouchableOpacity onPress={showPhotos} style={styles.changeProfileImageButtonContainer}>
                <Image
                  style={styles.changeProfileImageButton}
                  source={require('../assets/images/camera.png')}
                />
              </TouchableOpacity>
            </View>
            <CmPrasanmitBoldText style={{marginVertical:10,fontSize:30}}>{capitalizeFirstLetter(this.state.user.name)}</CmPrasanmitBoldText >
            <EditProfileDetail label = "ชื่อ-สกุล" information={this.state.user.firstname + ' ' + this.state.user.lastname} editable={false}/>
            <View style={styles.underline}>
                <CmPrasanmitBoldText style={styles.title}>กรุ๊ปเลือด</CmPrasanmitBoldText>
                <View style={{ borderBottomColor: '#DCDCDC', borderBottomWidth: 1,}}>
                  <TouchableOpacity onPress={() => this.setModalBloodVisible(true)} >
                    <View style={styles.informationText}>
                      {blood}
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
            <EditProfileDetail keyboardType='number-pad' label = "เบอร์โทรศัพท์" information= {this.state.phone} onChange={(phone) => this.setState({ phone })} editable={false}/>
            <EditProfileDetail keyboardType='email-address' label = "อีเมล์" information= {this.state.email} onChange={(email) => this.setState({ email })}/>
            <View style={styles.underline}>
                <CmPrasanmitBoldText style={styles.title}>จังหวัด</CmPrasanmitBoldText>
                <View style={{ borderBottomColor: '#DCDCDC', borderBottomWidth: 1,}}>
                  <TouchableOpacity onPress={() => this.setModalProvinceVisible(true)} >
                    <View style={styles.informationText}>
                      <Text style={[Font.style('CmPrasanmit'),{fontSize: 23,}]}>{this.state.province}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
            <EditProfileDetail keyboardType='number-pad' label = "ปีเกิด" information= {this.state.birthyear} onChange={(birthyear) => this.setState({ birthyear })}/>
            <View style={{marginTop:30}}/>
            <Button
              title="บันทึกการเปลี่ยนแปลง"
              onPress={this._editProfile}
              buttonColor={Colors.tabBar}
              colorFont="white"
              sizeFont={23}
              ButtonWidth={300}
              ButtonHeight={40}
              touchable={this.state.pressEdit}
            />
          </View>
        </ScrollView >
        </Animated.View> 
        </View>
      );
    }

    _editProfile = () => {
      this.setState({pressEdit: true})
      console.log(addressServer.APIRequest.toString() + '/api/user/edit');
      const api = addressServer.APIRequest.toString() + '/api/user/edit';
      axios(api,{ 
        method: 'post',
        headers: {'Authorization' : 'Bearer ' + this.state.token},
        data: {
          'email' : this.state.email,
          'blood' : this.state.blood,
          'blood_type' : this.state.blood_type,
          'province' : this.state.province,
          'birthyear' : this.state.birthyear,
        }
      })
      .then(response =>
      {
        console.log(response.data)
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Profile'})
          ]
        })
        this.props.navigation.dispatch(resetAction)
        this.setTimeout(() => {
          this.setState({pressEdit: false})
        }, 1000);
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
  informationText: {
    width: 200,
    height: 30,
  },
  underline : {
    flexDirection: 'row',
    width: 310,
    paddingVertical: 7,
    justifyContent: 'space-between'
  },
  title:{
    fontSize: 23,
    height:25,
    color: Colors.tabBar,
    alignSelf: 'center'
  },
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}