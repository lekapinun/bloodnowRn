import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Font } from 'expo';
import Colors from '../constants/Colors';
import InstructionFirstScreen from '../screens/InstructionFirstScreen';
import InstructionSecondScreen from '../screens/InstructionSecondScreen';
import InstructionThirdScreen from '../screens/InstructionThirdScreen';

export default class InstructionTab extends React.Component {
  static navigationOptions = {
    header: null
  }

  render(){
    const InstructionTab = StackNavigator({
        MyTab: {
          screen: TabNavigator({
            Instruction1 : {screen: InstructionFirstScreen},
            Instruction2 : {screen: InstructionSecondScreen},
            Instruction3 : {screen: InstructionThirdScreen},
          },{
            ...TabNavigator.Presets.AndroidTopTabs,
            tabBarOptions:{
              style: {
                height: 0
              },
            }
          }),
      }
    });

    return(
      <InstructionTab />
    );

  }
}
