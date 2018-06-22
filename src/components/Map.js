import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { PROBLEMS_ICONS, TREES_STATES } from '../consts/appConsts';
import { drawerOverlayStyles } from '../consts/styles';
import NavigationService from '../services/NavigationService';
import { locationType } from '../types';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treesIcons: [],
      problemsIcons: [],
    };
  }

  async componentDidMount() {
    const treesIcons = {};
    const problemsIcons = [];

    TREES_STATES.forEach(async state => {
      treesIcons[state.key] = await state.getImageSource();
    });

    Object.keys(PROBLEMS_ICONS).forEach(async key => {
      problemsIcons[key] = await PROBLEMS_ICONS[key].getImageSource();
    });

    this.setState({
      treesIcons,
      problemsIcons,
    });
  }

  render = () => (
    <View style={drawerOverlayStyles.container}>
      <MapView
        style={drawerOverlayStyles.mapContainer}
        region={this.props.location}
        onRegionChange={this.props.onRegionChange}
      >
        {this.props.trees.map(tree => (
          <MapView.Marker
            key={`marker-${tree.id}`}
            coordinate={{ longitude: tree.longitude, latitude: tree.latitude }}
            image={this.state.treesIcons[tree.tree_state]}
            onPress={() => NavigationService.goToTreeView(tree.id)}
          />
        ))}
        {this.props.problems.map(problem => (
          <MapView.Marker
            key={`marker-${problem.id}`}
            coordinate={{ longitude: problem.longitude, latitude: problem.latitude }}
            image={
              this.state.problemsIcons[problem.problem_type.name]
              || this.state.problemsIcons.other
            }
            onPress={() => NavigationService.goToProblemView(problem.id)}
          />
        ))}
      </MapView>

      <View style={drawerOverlayStyles.mapDrawerOverlay} />
    </View>
  );
}

Map.propTypes = {
  location: locationType.isRequired,
  trees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tree_state: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  ).isRequired,
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      problem_type: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        verbose_name: PropTypes.string,
        description: PropTypes.string,
      }),
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  ).isRequired,
  onRegionChange: PropTypes.func.isRequired,
};

export default Map;
