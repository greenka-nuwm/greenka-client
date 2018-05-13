import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapsService from '../services/MapsService';

export const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
    };
  }

  componentDidMount() {
    MapsService.getCurrentPosition().then(position => (
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    ));
  }

  render() {
    if (this.state.latitude && this.state.longitude) {
      return (
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        />
      );
    }

    return null;
  }
}

export default Map;
