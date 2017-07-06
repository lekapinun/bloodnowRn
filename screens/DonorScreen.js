import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Button,
    Switch,
} from 'react-native';
import { Font } from 'expo';
import { CardDetail, Countdown } from '../components/common';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { CmPrasanmitText } from '../components/CmPrasanmitText'
import { CmPrasanmitBoldText } from '../components/CmPrasanmitBoldText'


export default class DonorScreen extends Component {
    static navigationOptions =  {
        title: 'ให้เลือด',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };
    state = {
        countdownEnd: false,
        onMoreDetail: false,
        readyDonate: false,
        list: {
          title: 'เซเลน่า',
          thumbnail_image: "http://sim02.in.com/639415d3d6d757648ba28ff9e3929e59_lt.jpg"
        },
        nextReady: 0,
    }

    constructor(props) {
        super(props);
        console.log(props)
        setInterval(() => {
          if(this.state.nextReady > 0){
            this.setState({test : this.state.nextReady - 86400000})
          }
        }, 86400000);
    }

    componentWillMount() {
      this.setState({nextReady: (new Date('6/16/17').getTime() + (86400000*90)) - new Date().getTime() })
    }

    render() {
        return(
            <View style={[styles.center, {height:Layout.window.height,flex:1,paddingTop:16,backgroundColor:'white'}]}>
              {/*<Text>{(Math.floor(this.state.nextReady/(86400000))).toString()}</Text>*/}
              {/*<Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.onMoreDetail}
              >

                    <View
                      style={{ alignSelf: 'center', marginVertical: 150, width: 300, height: 300, backgroundColor: 'white' }}
                    >
                      <Text>
                        Hi there!
                      </Text>
                      <Text>{this.state.list.title}</Text>
                      <TouchableOpacity
                        style={{ position:'absolute', left: 0, right: 0, bottom: 0}}
                        title="Back"
                        onPress={ () => this.setState({ onMoreDetail: false})}
                      >
                        <Text style={{fontSize: 23, alignSelf: 'center'}}>Back</Text>
                      </TouchableOpacity>

                  </View>

              </Modal>*/}

              <Countdown recentDonateDate={this.state.nextReady} />

              <View style={{height:100,alignItems: 'center', flexDirection: 'row'}}>
              <CmPrasanmitText style={{color: '#575757',fontSize:25}}>คุณพร้อมบริจาคหรือไม่?</CmPrasanmitText>
                <View style={{marginLeft:20}}></View>
                <Switch 
                  onTintColor={Colors.tabBar} 
                  value={this.state.readyDonate} 
                  onChange={() => { 
                    //if(this.state.nextReady <= 0){
                      this.setState({readyDonate: !this.state.readyDonate})
                    //}
                  }} />
              </View>

              <CardDetail
                list={this.state.list}
                onPress={() => this.setState({ onMoreDetail: true }) }
                visible={this.state.readyDonate && (this.state.nextReady <= 0)}
                gropBlood='O-'
              />

            </View>
        );
    }

}

const styles = StyleSheet.create({
  center: {
        flexDirection: 'column',
        //justifyContent: 'center',
        alignItems: 'center'
    },
});
