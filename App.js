import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator,TabNavigator, TabBarTop } from 'react-navigation';

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

class Chat2Screen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy 2',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy 2</Text>
        <Text>Chat with Lucy 2</Text>
      </View>
    );
  }
}

class MainScreen extends React.Component {
  render(){
    const App = StackNavigator({
      Chat: {screen: ChatScreen},
    });
    return(
      <App/>
    );
  }

}

class SetupScreen extends React.Component {
  
  render(){
    const App = StackNavigator({
      Chat: {screen: Chat2Screen},
    });
    return(
      <App/>
    );
  }
}

const BasicApp = TabNavigator(
  {
    Main: {screen: MainScreen},
    Setup: {screen: SetupScreen},
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
    },
    TabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
  }
);

export default () => <BasicApp  />;