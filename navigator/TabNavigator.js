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
           // ...TabNavigator.Presets.AndroidTopTabs,
           initialRouteName: 'profile',
            tabBarOptions: {
                //activeTintColor: 'red',
                showLabel: false,
                showIcon: true,
                style: {
                    backgroundColor: 'white',
                    shadowColor: 'grey',
                    shadowOffset: {width: 2, height: -1},
                    shadowOpacity: 0.5,
                },
                //indicatorStyle: { borderBottomColor: Colors.tabIconSelected ,borderBottomWidth: 3},
            },
            tabBarPosition: 'bottom',
            swipeEnabled: false,
            animationEnabled: true,
        });

        ProfileStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('user', focused, 20)),
        };

/*        RequestStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('heart', focused, 20)),
        };*/

        DonorStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('drop', focused, 25)),
        };

        FriendStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('globe', focused, 20)),
        };

        InformationStack.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('notebook', focused, 20)),
        };

        return(
            <Tab/>
        );
        
    }
    _renderIconSimpleLineIcons(name, focused, size){
        return (
            <SimpleLineIcons
                name={name}
                size={size}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }
}