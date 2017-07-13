import React, { Component, PropTypes } from 'react';
import { Text, ScrollView, StyleSheet, View, Modal, Image, ActivityIndicator,AsyncStorage,TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import { NavigatorBackground, Button, RegisterInput, PickerPartTouch, PickerModalDate, ButtonBack } from '../components/common';
import { NavigationActions } from 'react-navigation'
import axios from 'axios'
import addressServer from '../utilities/addressServer';
import { CmPrasanmitText } from '../components/CmPrasanmitText'
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default class RegisterScreen3 extends Component {

    static navigationOptions = props => {
        return {
            title: 'ลงทะเบียน',
            headerTintColor: 'white',
            headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
            headerStyle: {backgroundColor: '#E84A5F'},
            headerLeft: <ButtonBack onPress={() => props.navigation.goBack()} color='white' />,
            gesturesEnabled: false,
        }
    };

    state = {
        isSelected1: false,
        isSelected2: false,
        modalDateVisible: false,
        date_donate: '',
        date_donateTemp: new Date(),
        last_date_donate: '',
        last_date_donateTemp: '',
        modalRegisterVisible: false,
    }

    setModalDateVisible(visible) {
      this.setState({modalDateVisible: visible});
    }


    render() {
        let recentDate;
        if(this.state.date_donate !== ''){
            recent = new Date(this.state.date_donate);
            this.state.last_date_donateTemp = recent.getDate().toString() + '/' +(recent.getMonth()+1).toString() + '/' + recent.getFullYear().toString()
            recentDate = <Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{this.state.last_date_donateTemp}</Text>
        }else{
            recentDate = <Text />
        }
        let Cansubmit = ''
        if( this.state.isSelected1 === true || this.state.last_date_donateTemp !== '' ){
            Cansubmit = '1'
        } else {
            Cansubmit = '0'
        }

        return(
            <ScrollView style={{flex: 1,flexDirection: 'column', backgroundColor: '#FAFAFA'}}> 
                <ModalRegister
                    pickerVisible = {this.state.modalRegisterVisible}
                    //onPress = { () => this.clickOkay() }
                    onPress = { () => this.setState({modalRegisterVisible: false}) }
                >
                </ModalRegister> 
                <PickerModalDate
                    pickerVisible = {this.state.modalDateVisible}
                    onPressCancel = {() => { this.setModalDateVisible(!this.state.modalDateVisible) }}
                    onPressSubmit = {() => {
                        this.setState({date_donate: this.state.date_donateTemp});
                        this.setModalDateVisible(!this.state.modalDateVisible);
                    }}
                    selectOne = {this.state.date_donateTemp}
                    onChangeOne = {date => this.setState({ date_donateTemp: date })}
                />     
                {/* <View style={{flex: 1,flexDirection: 'column', backgroundColor: '#FAFAFA'}}> */}
                    <Text style={{marginTop: 20,color: '#E84A5F',alignSelf:'center'}}>○ ○ ●</Text>
                    <View style={{width:Layout.window.width*0.8,alignSelf:'center'}}>
                        <CmPrasanmitBoldText style={{fontSize:25,marginTop: 50,marginBottom:10,color: Colors.tabBar}}>คุณเคยบริจาคเลือดหรือไม่?</CmPrasanmitBoldText>
                        <Checklist 
                            label='ไม่เคย' 
                            onPress={() => this.setState({isSelected1 : true, isSelected2 : false, last_date_donateTemp : ''})} 
                            isSelected={this.state.isSelected1}
                        />
                        <Checklist 
                            label='เคย' 
                            onPress={() => this.setState({isSelected2 : true, isSelected1 : false})} 
                            isSelected={this.state.isSelected2}
                        />
                    </View>
                    <View style={{marginTop:5,height:70,width:Layout.window.width*0.8,alignSelf:'center'}}>
                        { this.state.isSelected2 && <PickerPartTouch
                            label='บริจาคครั้งล่าสุด'
                            onPress={() => { this.setModalDateVisible(true) }}
                            information={recentDate}
                        /> }
                    </View> 
                    <View style={{marginVertical:40,justifyContent:'center',alignItems:'center'}}>
                        <Button
                            title="สร้างบัญชี"
                            onPress={() => this.setState({modalRegisterVisible: true})}
                            buttonColor={ Cansubmit === '1' ? Colors.tabBar : '#F6B6BF'}
                            colorFont="white"
                            sizeFont={23}
                            ButtonWidth={280}
                            ButtonHeight={40}
                            touchable={ Cansubmit === '1' ? false: true}
                        />
                    </View>
            {/*  </View> */}
            </ScrollView>
        );
    }
    
}

const Checklist = ({label,isSelected,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}  style={{flexDirection:'row',height:25,width:80,marginVertical:5}}>
            <View style={{alignSelf:'center',marginLeft:20}}>
                <Image
                    source = { isSelected ? require('../assets/icons/check.png') : require('../assets/icons/uncheck.png')}
                    style={{height:20,width:20}}
                />
            </View>
            <CmPrasanmitText style={{marginLeft:5,fontSize:25,alignSelf:'center',color:'#575757'}}>{' ' + label}</CmPrasanmitText>
        </TouchableOpacity>
    )
}

const ModalRegister = ({pickerVisible,onPress}) => {
  return(
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={pickerVisible}
      >
        <View style={[styles.container,{flex:1,backgroundColor:'rgba(52, 52, 52, 0.3)'}]}>
          <View style={{paddingTop:25,alignItems: 'center',height:190,width:220,backgroundColor:'white'}}>
            <Image source={require('../assets/icons/cr.png')} style={{height:70,width:70}}/>
            <Text style={[Font.style('CmPrasanmitBold'),{paddingTop:5,fontSize:27,color: '#4ED239'}]}>ลงทะเบียนสำเร็จ</Text>
            <View style={{borderBottomColor: '#B2ECA9', width:220, marginTop:20,borderBottomWidth: 1,}}/>
            <View style={{marginVertical:10}}>
              <Button
                onPress={onPress}
                buttonColor='white'
                title='ตกลง'
                sizeFont={20}
                ButtonWidth={200}
                colorFont='#898989'
              />
            </View> 
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerText: {
    paddingLeft:10,
    fontSize: 25,
  }
});

