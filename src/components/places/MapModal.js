import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { Subheader, Toolbar } from 'react-native-material-ui';
import update from 'immutability-helper';
import { containerStyles, mapStyles } from '../../consts/styles';
import LocationService from '../../services/LocationService';

class MapModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.props.address;
  }

  handleOnMapPress(event) {
    const { coordinate } = event.nativeEvent;

    LocationService.geocodePosition(coordinate).then(address => {
      this.setState(update(this.state, {
        addressString: { $set: address.formattedAddress },
        location: {
          latitude: { $set: coordinate.latitude },
          longitude: { $set: coordinate.longitude },
        },
      }));
    });
  }

  render() {
    return (
      <View style={containerStyles}>
        <Toolbar
          leftElement="arrow-back"
          centerElement="Торкніться місця на карті"
          rightElement={this.state.addressString !== '' ? 'send' : ''}
          onLeftElementPress={this.props.onClose}
          onRightElementPress={() => this.props.onSubmit(this.state)}
        />

        {this.state.addressString !== '' && <Subheader text={this.state.addressString} />}

        <MapView
          style={mapStyles}
          region={this.state.location}
          onPress={event => this.handleOnMapPress(event)}
        >
          <MapView.Marker
            coordinate={this.state.location}
          />
        </MapView>
      </View>
    );
  }
}

MapModal.propTypes = {
  address: PropTypes.shape({
    addressString: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MapModal;
