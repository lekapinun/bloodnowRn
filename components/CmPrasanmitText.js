import React from 'react';
import { Text } from 'react-native';
import { Font } from 'expo';

export class CmPrasanmitText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style,Font.style('CmPrasanmit')]}
      />
    );
  }
}
