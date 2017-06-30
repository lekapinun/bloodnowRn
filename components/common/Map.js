import React from 'react';
import { Linking } from 'react-native';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';

const Map = (props) => {
  //console.log(props)
  return(
    <MapView
      style={{height: 250, width: 300, alignSelf: 'center' }}
      provider={PROVIDER_GOOGLE}
      region={props.region}
      onRegionChange={props.onRegionChange}
    >
    <MapView.Marker
      title="TESTTitle"
      description="test descriptionp"
      coordinate={props.region}
      />
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
