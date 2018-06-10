import React, { Component } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import MapView from 'react-native-maps';
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import RNGooglePlaces from 'react-native-google-places';
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

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        const address = update(this.props.address, {
          addressString: { $set: place.address },
          location: {
            latitude: { $set: place.latitude },
            longitude: { $set: place.longitude },
          },
        });

        this.props.onAddressChange(address);
      })
      .catch(error => console.log(error.message));
  }

  handleModalSubmit(address) {
    this.props.onAddressChange(address);
    this.toggleModalVisibility();
  }

  toggleModalVisibility() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  render() {
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => this.openSearchModal()}>
            <TextField
              multiline
              editable={false}
              label="Адреса*"
              value={this.props.address.addressString}
              error={this.props.showAddressError ? 'Вкажіть адресу' : ''}
            />
          </TouchableOpacity>
        </View>

        <View>
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={this.props.address.location}
          />

          <Button
            style={{ text: styles.buttonText, container: styles.buttonContainer }}
            upperCase={false}
            text="Позначити місце на карті*"
            onPress={() => this.toggleModalVisibility()}
          />

          <Modal
            animationType="fade"
            visible={this.state.isModalVisible}
            onRequestClose={() => this.toggleModalVisibility()}
          >
            <MapModal
              address={this.props.address}
              onClose={() => this.toggleModalVisibility()}
              onSubmit={address => this.handleModalSubmit(address)}
            />
          </Modal>
        </View>
      </View>
    );
  }
}

AddressField.propTypes = {
  address: PropTypes.shape({
    addressString: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  showAddressError: PropTypes.bool.isRequired,
  onAddressChange: PropTypes.func.isRequired,
};

export default AddressField;
