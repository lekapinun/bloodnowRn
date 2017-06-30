import React, { Component} from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, AsyncStorage,ScrollView } from 'react-native';
import { Font } from 'expo';

import addressServer from '../utilities/addressServer';

import { Button } from '../components/common';

export default class LoginScreen extends Component {

    state = {
        name: '',
        password: '',
        error: false,
    };

    static navigationOptions = {
        header: null
    };


    componentWillMount() {
        console.log(addressServer.IPMac);
        /*this._checkLogin();*/
    }

/*    async _checkLogin() {
      try {
            const name = await AsyncStorage.getItem('@name:key');
            if (name !== null) {
                console.log(name);
                this.props.navigator.push('rootNavigation'); 
            }
        } catch ( error ) {
            console.log('error');
        }
    }*/

    renderErrorMessage() {
        if(!this.state.error){
            return <Text />
        }
        return <Text style={[Font.style('CmPrasanmit'),{ fontSize: 20,color:'red',}]}>ลองใหม่อีกครั้ง</Text>
    }

    render() {
        return(
            <ScrollView style={{flex: 1,flexDirection: 'column', backgroundColor: '#FAFAFA'}}> 
            <View style={{flex: 1,marginTop:80,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
                <Image source={require('../assets/icons/logo.png')} style={{width:190,height:90}}/>
                <View><Text style={[Font.style('CmPrasanmit'),styles.caption]}>ม า ก ก ว่ า ก า ร ใ ห้ เ ลื อ ด</Text></View>
                <View style={{width: 260}}>
                    <TextInput
                        style={[Font.style('CmPrasanmit'),styles.input]}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                        placeholder="ชื่อผู้ใช้หรือเบอร์โทรศัพท์"
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    <TextInput
                        style={[Font.style('CmPrasanmit'),styles.input]}
                        autoCorrect={false}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        placeholder="รหัสผ่าน"
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    {this.renderErrorMessage()}
                    <View style={{height: 30, marginTop:-5,justifyContent: 'flex-start',alignItems: 'flex-end'}}>
                        <TouchableOpacity>
                            <Text style={[Font.style('CmPrasanmit'),{ fontSize: 20,color:'#95989A',}]}>ลืมรหัสผ่าน?</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        title='เข้าสู่ระบบ'
                        buttonColor='#EF685E'
                        sizeFont={25}
                        onPress={this._loginPress}
                        ButtonWidth={260}
                        ButtonHeight={50}
                        colorFont='white'
                    />
                    <View style={{justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={[Font.style('CmPrasanmit'),{ fontSize: 23,color:'#95989A',marginBottom:5,marginTop:5}]}>หรือ</Text>
                    </View>
                    <Button
                        title='ลงทะเบียน'
                        buttonColor='#9FAC9B'
                        sizeFont={25}
                        onPress={this._register}
                        ButtonWidth={260}
                        ButtonHeight={50}
                        colorFont='white'
                    />
                </View>
            </View> 
            </ScrollView >
        );
    }

    async _userData(userData){
        try {
            console.log(userData);
            await AsyncStorage.setItem('@userData:key', JSON.stringify(userData));
        } catch ( error ) {
            console.log('error');
        }
    }


    _loginPress = () => {
        const { navigate } = this.props.navigation;
        navigate('Bloodnow')
        /*console.log(addressServer.IPMac.toString() + '/login');
        const api = addressServer.IPMac.toString() + '/login';
        this.setState({error : false});
        const myRequest = new Request(
            api,
            {
                method: 'POST',
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            });
        var userData = '';
        fetch(myRequest)
        .then((response) => response.text())
        .then((responseText) => {
            console.log(responseText)
            if( responseText != 'login fail')
            {
                userData = JSON.parse(responseText);
                console.log('login success');
                this._userData(userData);
                //this.props.navigator.push(Router.getRoute('test'));
                const rootNavigator = this.props.navigation.getNavigator('root');
                rootNavigator.replace('rootNavigationSliding');
            }
            else
            {
                this.setState({ password: '' });
                console.log('login fail');
                this.setState({error : true});
            }
        })
        .catch((error) => {
            console.warn(error);
        });  */
    };


    _register = () => {
        const { navigate } = this.props.navigation;
        navigate('Register')
    };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  caption: {
    fontSize: 27,
    color:'#95989A',
    marginBottom:40,
    marginTop:7,
  },
  input: {
    height: 50,
    borderColor: '#EEEDEE',
    borderWidth: 1,
    marginTop:10,
    paddingLeft:10,
    fontSize: 23,
    backgroundColor: 'white',
  },
});
