import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet,ActivityIndicator } from 'react-native';
import axios from 'axios';
import Colors from '../../constants/Colors';
import { NavigationActions } from 'react-navigation'
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'
import addressServer from '../../utilities/addressServer';

export class CardList extends Component{

  state = {
    list: [],
    loading: false,
    pressDetail: false,
  }

  componentWillMount() {
     /* axios.get(this.props.url)
    .then(response => this.setState({ list: response.data,loading: true }));  */
    console.log(addressServer.APIRequest.toString() + '/api/showdonate');
    const api = addressServer.APIRequest.toString() + '/api/showdonate';
    axios(api,{ method: 'get', headers: {'Authorization' : 'Bearer ' + this.props.token} })
    .then(response =>
    {
      console.log('asdfjkdsaknfmjdsa')
      console.log(response.data)
      this.setState({ list: response.data,loading: true })
    })
    .catch((error) =>  {
      console.log(error + ' @CardList')
      this.setState({ loading: true })
    })

  }

  renderList() {
    //console.log(this.state.list)
      return this.state.list.map(list =>
       <CardDetail
         key = {list.roomreq_id}
         name = {list.name}
         visible = {true}
         onPress = {() => this._goToDetail(list.roomreq_id)}
         disable={this.state.pressDetail}
       />
       //<CardDetail key={list.title} list={list} visible={true}/>
     );
   }

   _goToDetail = (detail_id) => {
    this.setState({pressDetail : true})
    const resetAction = NavigationActions.navigate({routeName: 'DonateHistory',params: {'detail_id' : detail_id,'token' : this.props.token}})
    this.props.navi.dispatch(resetAction)
    setTimeout(() => {
      this.setState({pressDetail : false})
    },1000) 
   }

  render() {
    if(this.state.loading) {
      if( this.state.list.length === 0 ) {
        return(
          <ScrollView style={styles.requestListContainerStyle}>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#DCDCDC',}}>
            <View style={[styles.requestCardContainerStyle,{marginLeft:28,justifyContent: 'center'}]}>
              <CmPrasanmitText style={{fontSize:22,color:'#575757'}}> ไม่มีรายการการให้เลือด</CmPrasanmitText>
            </View>
          </View>
          </ScrollView>
        )
      } else {
        return(
          <ScrollView style={styles.requestListContainerStyle}>
            {this.renderList()}
          </ScrollView>
        )
      }

    }
    return (
      <ScrollView style={styles.requestListContainerStyle}>
        <ActivityIndicator style={{alignSelf:'center'}} size="large" />
      </ScrollView>
    )
  }
}

const CardDetail = ({ name, onPress, visible, disable }) => {
  if(visible){
    return(
      <View style={{borderBottomWidth: 1, borderBottomColor: '#DCDCDC',}}>
      <TouchableOpacity disabled={disable} onPress={onPress} style={styles.requestCardContainerStyle} >
        <View style={{height:78,backgroundColor:'white',flexDirection:'row'}}>
          <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
            <Image
              style={styles.imageRequestStyle}
              source={{ uri: 'http://images.boomsbeat.com/data/images/full/6954/tayl-png.png' }}
            />
          </View>
          <View style={{flex:35,justifyContent: 'center',}}>
            <CmPrasanmitBoldText style={{fontSize:22,color:'#575757'}}>{capitalizeFirstLetter(name)}</CmPrasanmitBoldText>
          </View>
          <View style={{flex:14,marginRight:10,alignItems: 'center',justifyContent: 'center'}}>
            <CmPrasanmitText style={{fontSize:18,color:'#575757'}}>รายละเอียด</CmPrasanmitText>
          </View>
        </View>
      </TouchableOpacity>
      </View>
    );
  } else {
    return <View />
  }
}

const styles = StyleSheet.create({
  requestCardContainerStyle: {
    height: 78,
    width: 340,
    flexDirection: 'column',
    flex:1
    //alignItems: 'center',
  },
  imageRequestStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth:0.1,
    borderColor: '#575757'
  },
  detailRequestStyle: {
    paddingLeft: 20,
  },
  requestListContainerStyle: {
    marginTop:15,
    height: 250,
    alignSelf: 'center',
    width: 340,
    backgroundColor:'white'
  },
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
