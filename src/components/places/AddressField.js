import update from 'immutability-helper';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import MapView from 'react-native-maps';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-material-ui';
import { locationType } from '../../types';
import MapModal from './MapModal';

const styles = StyleSheet.create({
  buttonText: {
    color: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: 100,
  },
});

class AddressField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };
  }

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        const address = update(this.props, {
          addressString: { $set: place.address },
          location: {
            latitude: { $set: place.latitude },
            longitude: { $set: place.longitude },
          },
        });

        this.props.onAddressChange(address);
      })
      .catch(error => console.log(error.message));
  };

  handleModalSubmit = address => {
    this.props.onAddressChange(address);
    this.toggleModalVisibility();
  };

  toggleModalVisibility = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View>
        <View>
          <TouchableOpacity onPress={this.openSearchModal}>
            <TextField
              multiline
              editable={false}
              label="Адреса*"
              value={this.props.addressString}
              error={this.props.showAddressError ? 'Вкажіть адресу' : ''}
            />
          </TouchableOpacity>
        </View>

        <View>
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={this.props.location}
          />

          <Button
            style={{ text: styles.buttonText, container: styles.buttonContainer }}
            upperCase={false}
            text="Позначити місце на карті*"
            onPress={this.toggleModalVisibility}
          />

          <Modal
            animationType="fade"
            visible={this.state.isModalVisible}
            onRequestClose={this.toggleModalVisibility}
          >
            <MapModal
              addressString={this.props.addressString}
              location={this.props.location}
              onClose={this.toggleModalVisibility}
              onSubmit={this.handleModalSubmit}
            />
          </Modal>
        </View>
      </View>
    );
  }
}

AddressField.propTypes = {
  addressString: PropTypes.string.isRequired,
  location: locationType.isRequired,
  showAddressError: PropTypes.bool.isRequired,
  onAddressChange: PropTypes.func.isRequired,
};

export default AddressField;
