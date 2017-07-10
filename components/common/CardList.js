import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import Colors from '../../constants/Colors';
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'

export class CardList extends Component{

  state = {
    item: [],
  }

  componentWillMount() {
    axios.get(this.props.url)
    .then(response => this.setState({ item : response.data }));
  }

  /*renderList() {
     //console.log(this.state.list)
     return this.state.list.map(list =>
       <CardDetail key={list.title} list={list} visible={true}/>
     );
   }*/

   _keyExtractor = (item, title) => item.title;

   _renderItem = ({ item }) => (
     <CardDetail
       key = {item.title}
       list = {item}
       visible = {true}
     />
   );

  render() {
    return(
      <FlatList
        style = {styles.requestListContainerStyle}
        data = {this.state.item}
        keyExtractor = {this._keyExtractor.bind(this)}
        renderItem = {this._renderItem.bind(this)}
        initialNumToRender = {3}
      />
  )};
}

const CardDetail = ({ list, onPress, visible, gropBlood }) => {
  if(visible){
  return(
    <View style={{flex: 1}}>
    <TouchableOpacity onPress={onPress} style={[styles.requestCardContainerStyle,{borderWidth: 1, borderColor: '#DCDCDC',}]} >
      <View style={{height:78,backgroundColor:'#E8E8E8',flexDirection:'row'}}>
        <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
          <Image
            style={styles.imageRequestStyle}
            source={{ uri: list.thumbnail_image }}
          />
          <View style={{height:15,width:30,position:'absolute',bottom:12,left:18,backgroundColor:Colors.tabBar,borderRadius:15,alignItems: 'center',justifyContent:'center'}}>
            <CmPrasanmitBoldText style={{fontSize:17,color:'white',backgroundColor:'transparent'}}>{gropBlood}</CmPrasanmitBoldText>
          </View>
        </View>
        <View style={{flex:35,justifyContent: 'center',}}>
          <CmPrasanmitBoldText style={{fontSize:22,color:'#575757'}}>{list.title}</CmPrasanmitBoldText>
        </View>
        <View style={{flex:14,alignItems: 'center',justifyContent: 'center'}}>
          <CmPrasanmitText style={{fontSize:18,color:'#575757'}}>รายละเอียด</CmPrasanmitText>
        </View>
      </View>
    </TouchableOpacity>
  </View>
  );}
  else {
    return (
      <View />
    );}
}

const styles = StyleSheet.create({
  requestCardContainerStyle: {
    height: 78,
    width: 340,
    flexDirection: 'column',

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
    height: 300,
    alignSelf: 'center',
    width: 340,
    backgroundColor:'#E8E8E8'
    flex: 1
  },
});
