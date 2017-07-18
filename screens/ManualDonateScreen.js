import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Font } from 'expo';
import { PickerModalDate } from '../components/common';
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText';
import { CmPrasanmitText } from '../components/CmPrasanmitText';

export default class ManualDonateScreen extends Component {
  static navigationOptions =  {
    title: 'แก้ไข',
    headerTintColor: 'white',
    headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
    headerStyle: {backgroundColor: '#E84A5F'},
    gesturesEnabled: false,
  };

  state = {
    modalVisible: false,
    tmpDate: new Date(),
    date_donate: '',
  }

  render() {

    let recentDate;
    if(this.state.date_donate !== ''){
      recent = this.state.date_donate;
      recentDate = <Text style={[Font.style('CmPrasanmit'), styles.pickerText]}>{recent.getDate().toString() + '/' +(recent.getMonth()+1).toString() + '/' + recent.getFullYear().toString()}</Text>
    }else{
      recentDate = <Text />
    }
    return(
      <View style={{backgroundColor: 'white', flex: 1, }}>
        <PickerModalDate
          pickerVisible={this.state.modalVisible}
          onPressCancel={() => { this.setState({modalVisible: !this.state.modalVisible}) }}
          onPressSubmit={() => {
            this.setState({ date_donate: this.state.tmpDate})
            this.setState({modalVisible: !this.state.modalVisible})
          } }
          selectOne={this.state.tmpDate}
          onChangeOne={ tmpDate => this.setState({ tmpDate }) }
        />
        <View style={{ width: 300, marginTop:25, alignSelf: 'center'}}>
          <CmPrasanmitBoldText style={{ color:"#575757", fontSize: 25}}>
            วันบริจาคครั้งล่าสุด
          </CmPrasanmitBoldText>

          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: true})}>
            <View
              style={{ height: 30, marginBottom: 15, borderBottomWidth: 1, borderColor: '#95989A', justifyContent: 'flex-end'}}
              >
                {recentDate}
              </View>
            </TouchableOpacity>
            <CmPrasanmitText style={{ color: "#95989A", fontSize: 23}}>
              โปรดทราบ: คุณจะไม่สามารถแก้ไขวันบริจาคล่าสุดในช่วง 3 วันนับจากนี้
            </CmPrasanmitText>
          </View>

          <Button
            title="บันทึกการเปลี่ยนแปลง"
            onPress={() => {}}
          />
        </View>
      )
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
    }
  });
