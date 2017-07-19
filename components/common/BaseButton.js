import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Font } from 'expo'
import { CmPrasanmitBoldText, CmPrasanmitText } from '../';

class BaseButton extends Component {

  state = {
    'press' : false
  }
 
  render() {
    return(
      <TouchableOpacity 
        style={[styles.buttonStyle,this.props.ButtonStyle]} 
        onPress={this.props.onPress}
        disabled={this.props.press}
      >
        <Text style={this.props.fontStyle}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export {BaseButton}

