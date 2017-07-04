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


export default class DonorScreen extends Component {
    static navigationOptions =  {
        title: 'ให้เลือด',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };

    state = {
      onMoreDetail: false,
      readyDonate: false,
      list: {
        title: "test",
        thumbnail_image: "http://www.japanstyle.info/wordpress/wp-content/images/henohenomoheji.bmp"
      },
    }

    render() {
        return(
            <View>
              <Modal
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

              </Modal>

              <Countdown recentDonateDate='12/2/17'/>

              <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                <Text>คุณพร้อมบริจาคหรือไม่</Text>
                <Switch value={this.state.readyDonate} onChange={() => { this.setState({readyDonate: !this.state.readyDonate}); }} />
              </View>

              <CardDetail
                list={this.state.list}
                onPress={() => this.setState({ onMoreDetail: true }) }
                visible={this.state.readyDonate}
              />

            </View>
        );
    }

}

const styles = StyleSheet.create({

});
