import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Map = props => (
  <MapView
    style={styles.map}
    region={{
      latitude: props.latitude,
      longitude: props.longitude,
      latitudeDelta: props.latitudeDelta,
      longitudeDelta: props.longitudeDelta,
    }}
  />
);

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitudeDelta: PropTypes.number.isRequired,
  longitudeDelta: PropTypes.number.isRequired,
};

export default Map;
