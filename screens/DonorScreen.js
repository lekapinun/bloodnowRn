import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
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
      modalVisible: false,
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
                visible={this.state.modalVisible}
              >
                <View
                  style={{ alignSelf: 'center', marginVertical: 150, width: 300, height: 300, backgroundColor: 'white' }}
                >
                  <Text>
                    Hi there!
                  </Text>
                  <Text>{this.state.list.title}</Text>
                  <TouchableOpacity style={{ position:'absolute', left: 0, right: 0, bottom: 0}} title="Back" onPress={ () => this.setState({ modalVisible: false})}>
                    <Text style={{fontSize: 23, alignSelf: 'center'}}>Back</Text>
                  </TouchableOpacity>

                </View>
              </Modal>

              <Text>Donor SCREEN</Text>
              <Countdown recentDonateDate='7/2/17'/>
              <CardDetail list={this.state.list}
                onPress={() => this.setState({ modalVisible: true }) }/>
            </View>
        );
    }

}

const styles = StyleSheet.create({

});
