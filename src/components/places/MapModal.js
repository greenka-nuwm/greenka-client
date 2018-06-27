import update from 'immutability-helper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { Subheader, Toolbar } from 'react-native-material-ui';
import { containerStyles, mapStyles } from '../../consts/styles';
import LocationService from '../../services/LocationService';
import { locationType } from '../../types';

class MapModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fullAddress: this.props.addressString,
      addressString: this.props.addressString,
      location: this.props.location,
    };
  }

  componentDidMount = async () => {
    const [address, fullAddress] = await this.geocodePosition(this.state.location);

    this.setState({
      addressString: address,
      fullAddress,
    });
  };

  geocodePosition = async coordinate => {
    const {
      feature,
      streetName,
      streetNumber,
      formattedAddress,
    } = await LocationService.geocodePosition(coordinate);

    return [
      [feature, streetName, streetNumber].filter(x => x).join(', '),
      formattedAddress,
    ];
  };

  handleOnMapPress = async ({ nativeEvent: { coordinate } }) => {
    const [address, fullAddress] = await this.geocodePosition(coordinate);

    this.setState(update(this.state, {
      addressString: { $set: address },
      fullAddress: { $set: fullAddress },
      location: {
        latitude: { $set: coordinate.latitude },
        longitude: { $set: coordinate.longitude },
      },
    }));
  };

  handleSubmit = () => this.props.onSubmit(this.state);

  render() {
    return (
      <View style={containerStyles}>
        <Toolbar
          leftElement="arrow-back"
          centerElement="Торкніться місця на карті"
          rightElement={this.state.addressString !== '' ? 'send' : ''}
          onLeftElementPress={this.props.onClose}
          onRightElementPress={this.handleSubmit}
          style={{
            container: {
              height: 56,
              paddingTop: 0,
            },
          }}
        />

        {
          this.state.addressString !== ''
          && this.state.addressString != null
          && (
            <Subheader
              text={this.state.addressString}
              style={{
                container: {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}
            />
          )
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
  location: locationType.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MapModal;
