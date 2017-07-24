import React from 'react';
import { Linking, View, Image } from 'react-native';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';

const Map = (props) => {
  //console.log(props)
  return(
    <MapView
      style={{height: props.height ||250, width: props.width || 250, alignSelf: 'center' }}
      provider={PROVIDER_GOOGLE}
      onPress={props.onPress}
      region={props.region}
      onRegionChange={props.onRegionChange}
    >
      <View pointerEvents="none" style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'transparent'}}>
       <Image style={{width:23, height: 40, marginTop: 85, alignSelf: 'center'}} pointerEvents="none" source={require('../../assets/images/google-maps-marker.png')}/>
      </View>
    </MapView>
  );
}


export {Map}

/*export class Map extends React.Component {
  state = {
    region: {
      latitude: this.props.marker.latitude, // 18.792636,
      longitude: this.props.marker.longitude, // 98.953058,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    },
  };

  onRegionChange(region) {
    console.log(this.props);
    this.setState({ region });
  }

  render() {
    console.log(this.props)
    const url="http://maps.google.com/maps?daddr=("+ this.state.region.latitude + "," + this.state.region.longitude + ")";
    return (
      <MapView
        style={{height: 250, width: 300, alignSelf: 'center' }}
        provider={PROVIDER_GOOGLE}
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
        onPress={() => Linking.openURL(url)}
      >
        <MapView.Marker
          title="TESTTitle"
          description="test descriptionp"
          coordinate={this.state.region}
        />
      </MapView>
    );
  }
}*/
