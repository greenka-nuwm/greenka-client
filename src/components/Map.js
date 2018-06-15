import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { COLOR } from 'react-native-material-ui';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { drawerOverlayStyles } from '../consts/styles';
import NavigationService from '../services/NavigationService';

class Map extends Component {
  async componentDidMount() {
    const healthy = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.green600);
    const broken = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.yellow600);
    const dying = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.red600);
    const dry = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.orange600);
    const toping = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.purple600);
    const mistletoe = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.blue600);

    this.setState({
      icons: {
        healthy,
        broken,
        dying,
        dry,
        toping,
        mistletoe,
      },
    });
  }

  render() {
    return (
      <View style={drawerOverlayStyles.container}>
        <MapView
          style={drawerOverlayStyles.mapContainer}
          region={this.props.location}
          // onRegionChangeComplete={this.onRegionChange}
        >
          {this.props.trees.map(tree => (
            <MapView.Marker
              key={`marker-${tree.id}`}
              coordinate={{ longitude: tree.longitude, latitude: tree.latitude }}
              image={this.state.icons[tree.tree_state]}
              onPress={() => NavigationService.goToTreeView(tree.id)}
            />
          ))}
          {this.props.problems.map(problem => (
            <MapView.Marker
              key={`marker-${problem.id}`}
              coordinate={{ longitude: problem.longitude, latitude: problem.latitude }}
              onPress={() => NavigationService.goToProblemView(problem.id)}
            />
          ))}
        </MapView>

        <View style={drawerOverlayStyles.mapDrawerOverlay} />
      </View>
    );
  }
}

// TODO: specify types
Map.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }).isRequired,
  trees: PropTypes.arrayOf().isRequired,
  problems: PropTypes.arrayOf().isRequired,
  // onRegionChange: PropTypes.func.isRequired,
};

export default Map;
