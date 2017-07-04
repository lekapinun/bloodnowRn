import React, { Component } from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Modal
} from 'react-native';
import { Font } from 'expo'
import { NavigationActions } from 'react-navigation'
import { TestButton, NavigatorBackground,ExNavigationState} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import RequestBloodScreen from './RequestBloodScreen'

class ButtonRequest extends Component {
    _handlePress = () => {
        //console.log(this.props);
        //const { navigate } = this.props.navigation;
        //navigate('RequestBlood')
        const resetAction = NavigationActions.reset(
            {
                index: 1,
                actions: [ 
                    NavigationActions.navigate({ routeName: 'RequestHistory'}) ,
                    NavigationActions.navigate({ routeName: 'RequestBlood'})   
                ]
            }
        )
        this.props.navigation.dispatch(resetAction)
    };
    render(){
        return(
            <TouchableOpacity 
                onPress={this._handlePress}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 10, paddingTop: 1,}}
            >
                <Image
                    source={require('../assets/icons/exponent-icon.png')}
                    style={{ width: 21, height: 17 }}
                />
            </TouchableOpacity>
        );
    }
}

export default class RequestBloodHistoryScreen extends Component {
    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        //console.log(navigation)
        return {
            title: 'ขอเลือด',
            headerTintColor: Colors.tintColor,
            headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
            headerStyle: {backgroundColor: Colors.tabBar},
            gesturesEnabled: false,
            headerRight: <ButtonRequest navigation={navigation}/>,
            tabBarVisible: false
        };
    };
    

    render() {
        return(
            <View style={{flex:1,marginTop:30,backgroundColor:'transparent'}}>
                <View style={{height:20,width:20,backgroundColor:'red',position:'absolute'}}>

                </View>
                <View style={{height:20,width:20,backgroundColor:'black',position:'absolute'}}>

                </View>
                
                {/*<Modal style={{backgroundColor:'transparent'}}>   
                   <RequestBloodScreen/>
                </Modal>*/}
            </View> 
            /*<View style={{flex:1,marginTop:30}}>
                <Text>Re Blood His</Text>
                <View style={{
                    width:50,
                    height:50,
                    backgroundColor:'black',
                    position: 'absolute',
                    right:0,
                    bottom: 0,
                    left:0,
                }}>

                </View>
            </View>*/
        );
    }
}

