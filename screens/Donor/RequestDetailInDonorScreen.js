import React, {Component} from 'react';
import { ScrollView, View , Text ,StyleSheet, Dimensions, AsyncStorage,Linking } from 'react-native';
import { RequestDetailInDonor, Button, Map, Loading } from '../../components/common';
import { NavigationActions } from 'react-navigation';
import Colors from '../../constants/Colors';
import { Font } from 'expo';
import axios from 'axios';
import addressServer from '../../utilities/addressServer';

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
        region: {
            latitude: 18.788488,
            longitude: 98.971420,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
        },
        accept: false,
        room: '',
        finish: false,
    }

    componentWillMount() {
      console.log('2222222222222')
      console.log(this.props)
      console.log('adsfadsfdsafsdaf')
      console.log(this.props.navigation.state.params.id)
      console.log('adsfadsfdsafsdaf')
      AsyncStorage.getItem('@loginData:key')
      .then((loginStatus) => {
        const temp = JSON.parse(loginStatus)
        this.state.token = temp.token
        console.log(addressServer.APIRequest + '/api/donates/show');
        const api = addressServer.APIRequest + '/api/donates/show';
        /* console.log(addressServer.APIRequest + '/api/donate/detail');
        const api = addressServer.APIRequest + '/api/donate/detail'; */
        axios(api,{
          //method: 'post',
          method: 'get',
          headers: {'Authorization' : 'Bearer ' + this.state.token},
          //data: { 'roomreq_id': this.props.navigation.state.params.id}
        })
          .then(response => {
/*             console.log('1111111111')
            console.log(response)
            console.log('1111111111') */
            //console.log(response.data[0])
            console.log(response.data.user[0])
            //this.setState({room : response.data[0]})
            this.setState({room : response.data.user[0]})
            this.setState({region : {
              /* latitude: parseFloat(response.data[0].patient_hos_la),
              longitude: parseFloat(response.data[0].patient_hos_long), */
              latitude: parseFloat(response.data.user[0].patient_hos_la),
              longitude: parseFloat(response.data.user[0].patient_hos_long),
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421
              }
            })
            this.setState({finish : true})
          })
          .catch((error) => {
            console.log(error);
            this.setState({finish : true})
          });
      })
    }

    render() {
      const url="http://maps.google.com/maps?daddr=("+ this.state.region.latitude + "," + this.state.region.longitude + ")";
      if(this.state.finish) {
      return(
        <ScrollView style={{flex:1, backgroundColor: 'white' }}>
          <View style={{flex: 1,width:Dimensions.get('window').width,flexDirection: 'column',alignItems: 'center'}}>
            <View style={{marginTop:15}}></View>
            <RequestDetailInDonor label='ชื่อผู้ป่วย' information={this.state.room.patient_name}/>
            <RequestDetailInDonor label='รหัสผู้ป่วย' information={this.state.room.patient_id}/>
            <RequestDetailInDonor label='กรุ๊ปเลือด' information={this.state.room.patient_blood + this.state.room.patient_blood_type} />
            <RequestDetailInDonor label='รายละเอียด' information={this.state.room.patient_detail}/>
            <RequestDetailInDonor label='จังหวัด' information={this.state.room.patient_province}/>
            <RequestDetailInDonor label='สถานพยาบาล' information={this.state.room.patient_hos}/>
            <View style={{marginTop:20}}></View>
            <Map
              width={250}
              height={120}
              markerYPosition={20}
              region={this.state.region}
              onPress={() => Linking.openURL(url)}
              onRegionChange={() => {}}
              scrollEnabled={false}
            />
            <View style={{marginTop:25,flexDirection:'row'}}>
              <View style={styles.borderBottom}>
                <Button
                  title='ตอบรับ'
                  onPress={this._Accept}
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
                  onPress={this._Decline}
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
      );
      } else {
        return <Loading/>
      }
  }

  _Accept = () => {
    console.log(addressServer.APIRequest + '/api/donate');
    const api = addressServer.APIRequest + '/api/donate';
    axios(api,{
      method: 'post',
      headers: {'Authorization' : 'Bearer ' + this.state.token},
      data: {
        'roomreq_id': this.props.navigation.state.params.id,
        'status': 'accept'
      }
    })
    .then((response) => {
      console.log(response.data)
      this._backToDonor()
    })
    .catch((error) => {
      console.log(error)
    }) 
  }

  _Decline = () => {
    console.log(addressServer.APIRequest + '/api/donate');
    const api = addressServer.APIRequest + '/api/donate';
    axios(api,{
      method: 'post',
      headers: {'Authorization' : 'Bearer ' + this.state.token},
      data: {
        'roomreq_id': this.props.navigation.state.params.id,
        'status': 'decline'
      }
    })
    .then((response) => {
      console.log(response.data)
      this._backToDonor()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  _backToDonor = () => {
    const resetAction = NavigationActions.reset(
      {
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Donor'}) ,
        ]
      })
    this.props.navigation.dispatch(resetAction)
  }
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
