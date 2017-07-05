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
import { TestButton, NavigatorBackground,ExNavigationState,CardHistoryRequest} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import RequestBloodScreen from './RequestBloodScreen';
import axios from 'axios';

class ButtonRequest extends Component {
    _handlePress = () => {
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
                    source={require('../assets/images/addRequest.png')}
                    style={{ width: 30, height: 30 ,marginRight:10,marginBottom:5}}
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
    
    state = {
        history: [],
    }

    componentDidMount() {
         axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => this.setState({ history: response.data }))
        .catch(function (error) {
            console.log(error);
        });
    }

    renderHistory() {
        //console.log(this.state.history)
        return this.state.history.map(history =>
            <CardHistoryRequest
                key={history.title}
                blood = 'O'
                bloodType = '-'
                name = 'อักศร แลดูดี'
                hospital = {'โรงพยาบาล ' + history.title}
                status = {1}//'finished'
            /> 
        );
    }
    

    render() {
        return(
            <ScrollView style={{flex: 1}}> 
                <View style={[styles.center, {height:Layout.window.height,flex:1,paddingTop:16,backgroundColor:'white'}]}>
                    {this.renderHistory()} 
                </View> 
            </ScrollView>
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


