import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {CardDetail} from './CardDetail';
import axios from 'axios';

export class CardList extends Component{

  state = {
    list: [],
  }

  componentWillMount() {
    axios.get(this.props.url)
    .then(response => this.setState({ list: response.data }));
  }

  renderList() {
     return this.state.list.map(list =>
       <CardDetail key={list.title} list={list} />
     );
   }

  render() {
    return(
      <ScrollView style={[styles.requestListContainerStyle,{backgroundColor: 'rgba(92, 92, 61,0.8)'}]}>
        {this.renderList()}
      </ScrollView>
  )};
}

const styles = StyleSheet.create({
    requestListContainerStyle: {
      marginTop:15,
      height: '50%',
      alignSelf: 'center',
      width: '90%',
    },
});
