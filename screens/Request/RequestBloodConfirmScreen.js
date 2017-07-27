import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Modal, TouchableOpacity, Picker, StyleSheet,AsyncStorage,Dimensions, TouchableWithoutFeedback ,Animated,Image,Linking} from 'react-native';
import { Font } from 'expo';
import { Map, InputText, InputTextLarge , PickerPartTouch, PickerModalDate, PickerModalBlood, BaseButton, Button, ButtonBack,DetailBox,PickerModalProvince,LoadingModal} from '../../components/common';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationActions } from 'react-navigation'
import addressServer from '../../utilities/addressServer';
import axios from 'axios'
import { CmPrasanmitText, CmPrasanmitBoldText } from '../../components'

export default class RequestBloodConfirmScreen extends Component {
  static navigationOptions = props => {
    const { navigation } = props;
    const { state, setParams } = navigation;
    const { params } = state;
    return {
      headerTintColor: Colors.tintColor,
      headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
      headerStyle: {backgroundColor: Colors.tabBar},
      gesturesEnabled: false,
      headerTitle:'คำร้องขอรับเลือด',
      headerLeft: <ButtonBack onPress={() => navigation.goBack()} color='white' />,
    };
  };

  state = {
    data : this.props.navigation.state.params.detail,
    modalValidate : false,
    loading : false,
  }

  render() {
    return (
        <ScrollView style={{flex: 1,backgroundColor: 'white'}}>
          <View style={{flex: 1,width:Dimensions.get('window').width,flexDirection: 'column',alignItems: 'center'}}>
            <ModalValidate pickerVisible={this.state.modalValidate} onPress={() => this.setState({modalValidate:dalse})}/>
            <LoadingModal visible={this.state.loading}/>
            <View style={{marginTop:15}}></View>
            <DetailBox label='ชื่อผู้ป่วย' information={this.state.data.patient_name} />
            <DetailBox label='รหัสผู้ป่วย' information={this.state.data.patient_id}/>
            <DetailBox label='กรุ๊ปเลือด' information={this.state.data.patient_blood+this.state.data.patient_blood_type} />
            <DetailBox label='จำนวนเลือดที่ต้องการ' information={this.state.data.countblood + ' ถุง'} />
            <DetailBox label='รายละเอียด' information={this.state.data.patient_detail}/>
            <DetailBox label='จังหวัด' information={this.state.data.patient_province}/>
            <DetailBox label='สถานพยาบาล' information={this.state.data.patient_hos}/>
            <View style={{marginTop:25,flexDirection:'row'}}>
              <View style={styles.borderBottom}>
                <BaseButton
                  title='ยืนยัน'
                  onPress={this._ConfirmRequest}
                  fontStyle = {[Font.style('CmPrasanmit'),{fontSize:25,color:'white'}]}
                  ButtonStyle ={{backgroundColor:Colors.tabBar,height:40,width:100}}
                />
              </View>
              <View style={{marginLeft:15}} ></View>
              <View style={styles.borderBottom}>
                <BaseButton
                  title='ยกเลิก'
                  onPress={this._backToHistory}
                  fontStyle = {[Font.style('CmPrasanmit'),{fontSize:25,color:Colors.tabBar}]}
                  ButtonStyle ={{backgroundColor:'white',height:40,width:100}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
    )
  }

  _backToHistory = () => {
    this.props.navigation.state.params.navigation.goBack()
  }

  _ConfirmRequest = () => {
    this.setState({loading : true})
    this.state.data.patient_hos_la = this.state.data.region.latitude.toString()
    this.state.data.patient_hos_long = this.state.data.region.longitude.toString()
    console.log(this.state)
    console.log(addressServer.APIRequest + '/api/req');
    const api = addressServer.APIRequest + '/api/req';
    axios(api,{ 
      method: 'post', 
      headers: {'Authorization' : 'Bearer ' + this.state.data.token},
      data : this.state.data
    })
    .then(response => {
      console.log(response)
      if(response.status === 200 && response.data !== 'patient same'){
        this.setState({loading : false})
        this._backToHistory()
        this.props.screenProps.state.params.onSelect({listen: true})
      } else {
        this.setState({displayValidate: true})
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

const ModalValidate = ({pickerVisible,onPress}) => {
  return(
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={pickerVisible}
      >
        <View style={[styles.container,{flex:1,backgroundColor:'rgba(52, 52, 52, 0.3)'}]}>
            <View style={{paddingTop:25,alignItems: 'center',height:200,width:230,backgroundColor:'white',borderRadius:10}}>
                <Image source={require('../../assets/images/error.png')} style={{height:70,width:70}}/>
                <CmPrasanmitText style={{paddingTop:10,height:40,fontSize:25}}>คำร้องขอนี้ถูกสร้างแล้ว</CmPrasanmitText>
                <View style={{borderBottomColor: Colors.underlinePopup, width:230, marginTop:20,borderBottomWidth: 1,}}/>
                <View style={{marginTop: 10}}>
                <BaseButton
                    onPress={onPress}
                    title='ตกลง'
                    ButtonStyle = {{backgroundColor: 'transparent', width: 200,}}
                    fontStyle={[Font.style('CmPrasanmitBold'),{color: 'red',fontSize:25}]}
                />
                </View> 
            </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
    borderBottom: {
        borderColor: Colors.tabBar,
        borderWidth: 1
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
});


