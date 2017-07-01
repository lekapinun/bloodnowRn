import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons, 
 } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import FriendScreen from '../screens/FriendScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DonorScreen from '../screens/DonorScreen';
import RequestBloodScreen from '../screens/RequestBloodScreen';
import RequestBloodHistoryScreen from '../screens/RequestBloodHistoryScreen';
import RequestBloodSubmitScreen from '../screens/RequestBloodSubmitScreen';

import ProfileStack from './ProfileTab';
import RequestStack from './RequestTab';
import DonorStack from './DonorTab';
import FriendStack from './FriendTab';
import InformationStack from './InformationTab';


export default class Tab extends React.Component {
    static navigationOptions =  {
        header: null
    };   

    render(){
        //console.log(this.props.navigation)
        /*if(this.props.navigation.action){

        }*/
        const Tab = TabNavigator(
        {
            profile: {screen: ProfileStack},
            requestbloodhistory: {screen: RequestStack},
            donor: {screen: DonorStack},
            friend: {screen: FriendStack},
            Information: {screen: InformationStack},
        },{
            ...TabNavigator.Presets.AndroidTopTabs,
            tabBarOptions: {
                //activeTintColor: 'red',
                showLabel: false,
                showIcon: true,
                style: {
                    position: 'absolute',
                    top:-600,
                    left:0,
                    right:0,
                    backgroundColor: 'black'
                },
                indicatorStyle: { borderBottomColor: Colors.tabIconSelected ,borderBottomWidth: 3},
            },
            tabBarPosition: 'bottom',
            swipeEnabled: true,
            animationEnabled: true,
        });

        ProfileStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('user', focused)),
        };

        RequestStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('heart', focused)),
        };

        DonorStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('drop', focused)),
        };

        FriendStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('globe', focused)),
        };

        InformationStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('notebook', focused)),
        };

        return(
            <Tab/>
        );
        
    }
    _renderIconSimpleLineIcons(name, focused){
        return (
            <SimpleLineIcons
                name={name}
                size={20}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }
}