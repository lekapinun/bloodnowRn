import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button, Modal, ActivityIndicator, TouchableOpacity} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
 } from '@expo/vector-icons';

import ProfileStack from './ProfileTab';
import RequestStack from './RequestTab';
import DonorStack from './DonorTab';
import FriendStack from './FriendTab';
import InformationTab from './InformationTab';


export default class Tab extends React.Component {
    static navigationOptions =  {
        header: null
    };

    state = {
        loading : true
    }
    componentWillMount() {
        setTimeout(() => {
            this.setState({loading : false})
        },500)
    }

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
            Information: {screen: InformationTab},
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

        InformationTab.navigationOptions = {
            tabBarIcon: ({ tintColor, focused }) => ( this._renderIconSimpleLineIcons('notebook', focused, 20)),
        };
        return this.state.loading ? <Loading visible={this.state.loading}/> : <Tab screenProps={this.props}/>

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

const Loading = ({visible}) => {
  return (
    <Modal visible={visible}>
        <View style={{flex:1,backgroundColor:'#FAFAFA',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" />
        </View>
    </Modal>
  )
}
