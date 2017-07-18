import React, { Component} from 'react';
import { View, ScrollView,  Keyboard, Animated } from 'react-native';
import Colors from '../constants/Colors.js'

class KeyboardAvoid extends Component {

    componentWillMount () {
      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
      this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
      this.positon = new Animated.ValueXY(0,0);
    }

    componentWillUnmount () {
      this.keyboardWillShowListener.remove();
      this.keyboardWillHideListener.remove();
    }

    _keyboardWillShow = () => {
      this.positon = new Animated.ValueXY({ x: 0, y: 0});
      Animated.timing(this.positon,{
          toValue: { x: 0, y: -100},
      }).start();
      this.forceUpdate();
    }

    _keyboardWillHide = () => {
      this.positon = new Animated.ValueXY({ x: 0, y: -100});
      Animated.timing(this.positon,{
          toValue: { x: 0, y: 0},
      }).start();
      this.forceUpdate();
    }

    render() {
        return(
            <View style={{backgroundColor:'#FAFAFA',flex:1}}>
                <Animated.View { ...this.props} style={[this.positon.getLayout(),{flex:1}]} />
            </View>
        );
    }

}

export {KeyboardAvoid}
