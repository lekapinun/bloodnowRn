import React, {Component} from 'react';
import { ScrollView, View , TextInput, Text ,StyleSheet, Dimensions, AsyncStorage, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native';
import { RequestDetailInDonor, BaseButton , Button, Map, Loading } from '../../components/common';
import Colors from '../../constants/Colors';
import Expo,{ Font } from 'expo';
import { NavigationActions } from 'react-navigation'
import addressServer from '../../utilities/addressServer';
import axios from 'axios'
import { CmPrasanmitText } from '../../components/CmPrasanmitText'
import { CmPrasanmitBoldText } from '../../components/CmPrasanmitBoldText'

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
      detail_id : 0,
      token : '',
      data : '',
      date_rem : 0,
      complete : true,
      time: '',
      time_exp: '',
      displayFinish: false,
      displayRe: false,
      displayThankyou: false,
      loading: false,
      thankyou: '',
      thankyou_temp: '',
      bloodWant: '',
      loadingModal: false,
    }

    componentWillMount() {
      this.state.detail_id = this.props.navigation.state.params.params
      console.log(this.props.navigation.state.params.params)
      AsyncStorage.getItem('@loginData:key')
      .then((loginStatus) => {
        const temp = JSON.parse(loginStatus)
        this.state.token = temp.token
        console.log(addressServer.APIRequest + '/api/req/detail');
        const api = addressServer.APIRequest + '/api/req/detail';
        console.log(this.state.detail_id)
        axios(api,{ 
          method: 'post', 
          headers: {'Authorization' : 'Bearer ' + this.state.token},
          data: { 'roomreq_id': this.props.navigation.state.params.params}
        })
          .then(response => {
            //console.log(response.data)
            if( response.data[0].patient_status !== 'complete') { 
              this.setState({complete : false})
            } else {
              this.setState({complete : true})
            }
            this.setState({data: response.data[0]})
            var date = response.data[0].created_at.split(' ')[0]
            date = date.split('-')
            var dateTime = new Date(date[1] + '/' + date[2] + '/' + date[0])
            var temp_time = Math.floor((new Date().getTime() - dateTime.getTime())/(86400000)) 
            this.setState({date_rem: temp_time})
            dateTime = dateTime.getDate() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getFullYear()
            if(response.data[0].complete_time !== null){
              console.log(response.data[0].complete_time)
              var date_exp = response.data[0].complete_time.split(' ')[0]
              date_exp = date_exp.split('-')
              var month_temp = date_exp[1]
              var dateTime_exp = date_exp[2] + '/' + ( month_temp[0] === '0' ? month_temp[1] : month_temp ) + '/' + date_exp[0]
              console.log(dateTime_exp)
              //dateTime_exp = dateTime_exp.getDate() + '/' + (dateTime_exp.getMonth() + 1) + '/' + dateTime_exp.getFullYear()
              this.setState({time_exp: dateTime_exp})
            }
            this.setState({time : dateTime,thankyou_temp : response.data[0].patient_thankyou})
            this.setState({loading : true, bloodWant: response.data[0].countblood.toString()})
            //console.log(dateTime)
            //console.log(dateTime_exp)
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    }

    _renderButtonFinish() {
      if(this.state.complete === false){
        return(
          <View style={[styles.borderBottom,{marginLeft:10,marginRight:10}]}>
            <Button
              title='คำขอเสร็จสิ้น'
              onPress={ () => this.setState({displayFinish: true})}
              buttonColor='#E84A5F'
              sizeFont={20}
              ButtonWidth={140}
              ButtonHeight={35}
              colorFont= 'white'
            />
          </View>
        );
      }
      return <View/>
    }

    _renderButtonRe() {
      if(this.state.date_rem >= 3 && this.state.complete === false){
        return (
          <View style={[styles.borderBottom,{marginLeft:10,marginRight:10}]}>
            <TouchableOpacity 
              style={[styles.buttonStyle,{backgroundColor: 'white',width: 140, height: 35}]} 
              onPress={() => this.setState({displayRe: true})}
            >
              <Image
                source={require('../../assets/images/refresh.png')} style={{marginRight:5,height:18,width:18}}
              />
              <Text style={[Font.style('CmPrasanmit'),{fontSize: 20,color: Colors.tabBar}]}>ส่งคำขอร้องอีกครั้ง</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return <View/>
    }

    _renderThankBox() {
      if(this.state.complete === true && this.state.thankyou_temp === null){
        return (
          <View style={[styles.borderBottom,{width:300, height:85, marginTop:20,marginBottom:20,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}]}>
              <CmPrasanmitText style={{fontSize:22,marginBottom:10}}>ส่งคำขอบคุณให้กับผู้ตอบรับคำขอของคุณ</CmPrasanmitText>
              <Button
                title='คำขอบคุณ'
                onPress={ () => this.setState({displayThankyou: true})}
                buttonColor='#E84A5F'
                sizeFont={20}
                ButtonWidth={80}
                ButtonHeight={30}
                colorFont= 'white'
              />  
          </View>
        );
      }
      return <View/>
    }

    render() {
      var height_detail = 51
      if(this.state.loading){
        return (
          <ScrollView style={{flex:1, backgroundColor: 'white' }}>
            <View style={{flex: 1,width:Dimensions.get('window').width,flexDirection: 'column',alignItems: 'center'}}>
              <ModalFinish
                pickerVisible = {this.state.displayFinish}
                onPress1 = { () =>  this._success() }
                onPress2 = { () => this.setState({displayFinish: false})}
                loading = {this.state.loadingModal}
              >
              </ModalFinish>
              <ModalRe
                pickerVisible = {this.state.displayRe}
                onPress1 = { () => this._refresh() }
                onPress2 = { () => this.setState({displayRe: false}) }
                value = {this.state.bloodWant}
                onChangeText = {(bloodWant) => this.setState({bloodWant})}
                loading = {this.state.loadingModal}
              >
              </ModalRe>
              <ModalThankyou
                pickerVisible = {this.state.displayThankyou}
                value={this.state.thankyou}
                onChangeText={(thankyou) => this.setState({ thankyou })}
                onPress1 = { () => {
                  this.setState({displayThankyou: false})
                }}
                onPress2 = { () => this._thankyou()}
                loading = {this.state.loadingModal}
              >
              </ModalThankyou>
              {!this.state.loadingModal && <View>
                {this._renderThankBox()}
                <View style={{marginTop:10}}></View>
                <RequestDetailInDonor label='ชื่อผู้ป่วย' information={this.state.data.patient_name} height={height_detail}/>
                <RequestDetailInDonor label='รหัสผู้ป่วย' information={this.state.data.patient_id} height={height_detail}/>
                <RequestDetailInDonor label='กรุ๊ปเลือด' information={this.state.data.patient_blood + this.state.data.patient_blood_type} height={height_detail}/>
                <RequestDetailInDonor label='จังหวัด' information={this.state.data.patient_province} height={height_detail}/>
                <RequestDetailInDonor label='สถานพยาบาล' information={this.state.data.patient_hos} height={height_detail}/>
                <RequestDetailInDonor label='วันที่ขอบริจาค' information={this.state.time} height={height_detail}/>
                {this.state.time_exp !== '' && <RequestDetailInDonor label='วันที่สิ้นสุด' information={this.state.time_exp} height={height_detail}/> }
                { this.state.complete === false && <RequestDetailInDonor label='จำนวนเลือดที่ขอ' information={this.state.data.countblood + ' ถุง'} height={height_detail}/>}
                <View style={{marginTop:40,flexDirection:'row',justifyContent:'center'}}>
                  {this._renderButtonRe()}
                  {this._renderButtonFinish()}
                </View>
              </View>}
            </View>
          </ScrollView>
        )
      } else {
        return <Loading />
      }
    }

    _backHistory = () => {
      /* const resetAction = NavigationActions.reset(
      {
        index: 0,
        actions: [ 
          NavigationActions.navigate({ routeName: 'RequestHistory'}) ,
        ]
      })
      this.props.navigation.dispatch(resetAction) */
      this.props.navigation.goBack()
      this.props.navigation.state.params.onSelect({listen: true})
    }

    _success = () => {
      this.setState({loadingModal:true})
      console.log(addressServer.APIRequest + '/api/req/success');
      const api = addressServer.APIRequest + '/api/req/success';
      axios(api,{ 
        method: 'post', 
        headers: {'Authorization' : 'Bearer ' + this.state.token},
        data : { 'roomreq_id' : this.props.navigation.state.params.params}
      })
        .then(() => {
          this.setState({displayFinish: false, loadingModal:false})
          this._backHistory()
        })
        .catch((error) => console.log(error))
    }

    _refresh = () => {
      this.setState({loadingModal:true})
      console.log(addressServer.APIRequest + '/api/req/refresh');
      const api = addressServer.APIRequest + '/api/req/refresh';
      console.log(this.props.navigation.state.params.params)
      console.log(this.state.bloodWant)
      axios(api,{ 
        method: 'post', 
        headers: {'Authorization' : 'Bearer ' + this.state.token},
        data : { 
          'roomreq_id' : this.props.navigation.state.params.params,
          'countblood' : this.state.bloodWant
        }
      })
        .then(() => {
          this.setState({displayRe: false, loadingModal:false})
          this._backHistory()
        })
        .catch((error) => console.log(error)) 
    }
    
    _thankyou = () => {
      this.setState({loadingModal:true})
      console.log(addressServer.APIRequest + '/api/req/thankyou');
      const api = addressServer.APIRequest + '/api/req/thankyou';
      axios(api,{ 
        method: 'post', 
        headers: {'Authorization' : 'Bearer ' + this.state.token},
        data : { 
          'roomreq_id' : this.props.navigation.state.params.params,
          'thankyou' : this.state.thankyou,
        }
      })

        .then((response) => {
          this.setState({displayThankyou: false, loadingModal:false})
          this._backHistory()
        })
        .catch((error) => console.log(error))
    } 
}

const ModalFinish = ({pickerVisible,onPress1,onPress2,loading}) => {
  return(
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={pickerVisible}
      >
        { loading && <LoadingModal/> }
        {!loading && <View style={[styles.container,{flex:1,backgroundColor:'rgba(52, 52, 52, 0.3)'}]}>
            <View style={{paddingTop:25,alignItems: 'center',height:188,width:230,backgroundColor:'white',borderRadius:10}}>
                <Image source={require('../../assets/images/conf.png')} style={{height:70,width:70}}/>
                <Text style={[Font.style('CmPrasanmit'),{paddingTop:5,fontSize:23}]}>คำร้องขอของคุณเสร็จสิ้นแล้ว?</Text>
                <View style={{borderBottomColor: Colors.underlinePopup, width:230, marginTop:20,borderBottomWidth: 1,}}/>
                <View style={{marginTop: 10,flexDirection:'row'}}>
                  <BaseButton
                    onPress={onPress1}
                    title='ตกลง'
                    ButtonStyle = {{backgroundColor: 'transparent', width: 115,}}
                    fontStyle={[Font.style('CmPrasanmitBold'),{color: 'red',fontSize:23}]}
                  />
                  <View style={{borderColor: Colors.underlinePopup,width:1,height:43,borderRightWidth: 1,position:'absolute',right:115,top:-10}}/>
                  <BaseButton
                    onPress={onPress2}
                    title='ยกเลิก'
                    ButtonStyle = {{backgroundColor: 'transparent', width: 115,}}
                    fontStyle={[Font.style('CmPrasanmitBold'),{color: 'red',fontSize:23}]}
                  />
                </View> 
            </View>
        </View>}
      </Modal>
  );
}


const ModalRe = ({pickerVisible,onPress1,onPress2,value,onChangeText,loading}) => {
  return(
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={pickerVisible}
      >
        { loading && <LoadingModal/> }
        {!loading && <View style={[styles.container,{flex:1,backgroundColor:'rgba(52, 52, 52, 0.3)'}]}>
            <View style={{paddingTop:25,alignItems: 'center',height:154,width:260,backgroundColor:'white',borderRadius:10}}>
                <View style={{height:67,justifyContent:'space-around',alignItems:'center'}}>
                  <Text style={[Font.style('CmPrasanmitBold'),{paddingTop:5,fontSize:23,color:Colors.textgrey}]}>คุณต้องการส่งคำขออีกครั้ง?</Text>
                  <View style={{flexDirection: 'row',paddingTop:5}}>
                    <CmPrasanmitText style={{fontSize:21,color: Colors.textgreydetail}}>ต้องการเลือดอีก </CmPrasanmitText>
                    <View style={{width:60,borderBottomWidth : 0.5,borderBottomColor : Colors.textgreydetail,alignItems:'center'}}>
                      <TextInput
                        style={[Font.style('CmPrasanmit'),styles.input,{alignSelf:'center', marginLeft : (value.length < 2) ? 10 : 0}]}
                        value={value}
                        onChangeText={onChangeText}
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                      />
                    </View>
                    <CmPrasanmitText style={{fontSize:21,color: Colors.textgreydetail}}> ถุง</CmPrasanmitText>
                  </View>
                </View>
                <View style={{borderBottomColor: Colors.underlinePopup, width:260, marginTop:20,borderBottomWidth: 1,}}/>
                <View style={{marginTop: 10,flexDirection:'row'}}>
                  <BaseButton
                    onPress={onPress1}
                    title='ตกลง'
                    ButtonStyle = {{backgroundColor: 'transparent', width: 130,}}
                    fontStyle={[Font.style('CmPrasanmitBold'),{color: 'red',fontSize:23}]}
                  />
                  <View style={{borderColor: Colors.underlinePopup,width:1,height:41.5,borderRightWidth: 1,position:'absolute',right:130,top:-10}}/>
                  <BaseButton
                    onPress={onPress2}
                    title='ยกเลิก'
                    ButtonStyle = {{backgroundColor: 'transparent', width: 130,}}
                    fontStyle={[Font.style('CmPrasanmitBold'),{color: 'red',fontSize:23}]}
                  />
                </View> 
            </View>
        </View>}
      </Modal>
  );
}

const ModalThankyou = ({pickerVisible,onPress1,onPress2,value,onChangeText,loading}) => {
  return(
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={pickerVisible}
      >
        { loading && <LoadingModal/> }
        {!loading && <View style={[styles.container,{flex:1,backgroundColor:'rgba(52, 52, 52, 0.3)'}]}>
            <View style={{height:200,width:300,backgroundColor:'white',borderRadius:10}}>
                <View style={{height:40,width:300,flexDirection:'row',borderBottomColor: '#DCDCDC',borderBottomWidth: 1,backgroundColor:'transparent'}}>
                  <View style={{flex:1}}/>
                  <View style={[styles.container,{flex:9}]}>
                    <Text style={[Font.style('CmPrasanmit'),{fontSize:23}]}>คำขอบคุณ</Text>
                  </View>
                  <TouchableOpacity onPress={onPress1} style={[styles.container,{flex:1}]}>
                    <Text style={[Font.style('CmPrasanmitBold'),{fontSize:25,color:'#DCDCDC'}]}>x</Text>
                  </TouchableOpacity>
                </View> 
                <View style={{height:90,width:265,marginTop:15,borderColor: 'red',borderWidth: 0.5,backgroundColor:'transparent',borderRadius:5,alignSelf:'center'}}>
                  <TextInput
                    multiline
                    style={[Font.style('CmPrasanmit'),{alignSelf:'center',height:60,width:250,fontSize: 20}]}
                    placeholder='พิมพ์ข้อความของคุณที่นี่'
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={120}
                  />
                </View>
                <View style={{height:40,width:265,marginTop:10,backgroundColor:'transparent',borderRadius:5,alignSelf:'center'}}>
                  <View style={{height:40,width:265,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Text style={[Font.style('CmPrasanmitBold'),{alignSelf:'center',fontSize:20,color:'#DCDCDC',marginRight:10}]}>{ 120 - value.length}</Text>
                    <TouchableOpacity onPress={onPress2} style={{height:35,width:52,backgroundColor:Colors.tabBar,alignItems:'center',borderRadius:3,justifyContent:'center'}}>
                      <Text style={[Font.style('CmPrasanmitBold'),{fontSize:20,color:'white'}]}>ส่ง</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
        </View>}
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
  },
  borderBottom: {
    borderColor: Colors.tabBar,
    borderWidth: 1,
  },
  buttonStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    height: 21,
    width: 20,
    fontSize: 21,
    backgroundColor: 'transparent',
    color: Colors.textgreydetail
  },
});

const LoadingModal = () => {
  return (
    <View style={{flex:1,justifyContent:'center',backgroundColor:'transparent',alignItems:'center',backgroundColor:'rgba(52, 52, 52, 0.3)'}}>
      <View style={{backgroundColor:'white',height:134,paddingHorizontal:20,marginTop:-10,alignItems:'center',justifyContent:'space-around',borderRadius:10}}>
        <View/>
        <ActivityIndicator style={{marginRight:-3,marginBottom:-4}} size="large" />
        <CmPrasanmitText style={{fontSize:20,color:Colors.textgreydetail,marginTop:15}}>กำลังดาวน์โหลด</CmPrasanmitText>
        <View/>
      </View>
    </View>   
  )
}