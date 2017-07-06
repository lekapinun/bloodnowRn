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
import { NavigationActions } from 'react-navigation';
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
    countdownEnd: false,
    readyDonate: false,
    list: {
      title: "test",
      thumbnail_image: "http://www.japanstyle.info/wordpress/wp-content/images/henohenomoheji.bmp"
    },
    }

    render() {
        return(
            <View>
              <Countdown recentDonateDate='12/2/16' />

              <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                <Text>คุณพร้อมบริจาคหรือไม่</Text>
                <Switch value={this.state.readyDonate} onChange={() => { this.setState({readyDonate: !this.state.readyDonate}); }} />
              </View>

              <CardDetail
                list={this.state.list}
                onPress={() => {
                  const resetAction = NavigationActions.reset(
                    {
                      index: 1,
                      actions: [
                        NavigationActions.navigate({ routeName: 'Donor'}) ,
                        NavigationActions.navigate({ routeName: 'RequestInDonor'})
                      ]
                    }
                  )
                  this.props.navigation.dispatch(resetAction)
                }}
                visible={this.state.readyDonate}
              />

            </View>
        );
    }

}

const styles = StyleSheet.create({

});
