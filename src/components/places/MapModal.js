import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StatusBar, View } from 'react-native';
import MapView from 'react-native-maps';
import { COLOR, Subheader, Toolbar } from 'react-native-material-ui';
import update from 'immutability-helper';
import { containerStyles, mapStyles } from '../../consts/styles';
import LocationService from '../../services/LocationService';

class MapModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      addressString: this.props.addressString,
      location: this.props.location,
    };
  }

  handleOnMapPress = ({ nativeEvent: { coordinate } }) => {
    LocationService.geocodePosition(coordinate).then(address => {
      this.setState(update(this.state, {
        addressString: { $set: address.formattedAddress },
        location: {
          latitude: { $set: coordinate.latitude },
          longitude: { $set: coordinate.longitude },
        },
      }));
    });
  };

  handleSubmit = () => this.props.onSubmit(this.state);

  render() {
    return (
      <View style={containerStyles}>
        <StatusBar
          backgroundColor={COLOR.green900}
          barStyle="light-content"
        />

        <Toolbar
          leftElement="arrow-back"
          centerElement="Торкніться місця на карті"
          rightElement={this.state.addressString !== '' ? 'send' : ''}
          onLeftElementPress={this.props.onClose}
          onRightElementPress={this.handleSubmit}
        />

        {
          this.state.addressString !== ''
          && this.state.addressString != null
          && <Subheader text={this.state.addressString} />
        }

        <MapView
          style={mapStyles}
          region={this.state.location}
          onPress={this.handleOnMapPress}
        >
          <MapView.Marker coordinate={this.state.location} />
        </MapView>
      </View>
    );
  }
}

MapModal.propTypes = {
  addressString: PropTypes.string.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MapModal;
