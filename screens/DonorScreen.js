import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  Image,
  StyleSheet,
} from 'reactnative';
import { Font } from 'expo';
import { Countdown, CardList } from '../components/common';

export default class DonorScreen extends Component {
    static navigationOptions =  {
        title: 'ให้เลือด',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };

    state = {
      moreDetailModal: false,
      date: '6/14/17',
    }

    _onMoreDetailPress() {
      this.setState({ moreDetailModal: true })
    }

    render() {
      return(
        <View>

          <Text>Donor SCREEN</Text>
          <Countdown recentDonateDate={date} />

          <View style={[styles.requestCardContainer,{backgroundColor: 'rgba(0, 102, 255,0.8)', height: '20%', flexDirection: 'row',  alignItems: 'center'}]}>
            <Image style={styles.requestImageStyle} source={require("../assets/images/logo.png")}/>
            <Text style={styles.requestDetailStyle}>Current Request</Text>
            <TouchableOpacity
              style={styles.requestMoreDetailStyle}
              onPress={() => this._onMoreDetailPress()} >
              <Text> More Detail</Text>
            </TouchableOpacity>
          </View>

          <CardList url={"https://rallycoding.herokuapp.com/api/music_albums"} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  requestCardContainer: {
    marginTop:15,
    alignSelf: 'center',
    width: '90%',
  },
  requestImageStyle: {
    marginLeft: 10,
    marginTop: 10,
    height: 50,
    width: 50,
  },
  requestDetailStyle: {
    paddingLeft: 20,
  },
  requestMoreDetailStyle: {

  },
});
