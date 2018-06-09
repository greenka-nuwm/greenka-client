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
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.showAddressError !== nextProps.showAddressError) {
      return { showAddressError: nextProps.showAddressError };
    }

    return {};
  }

  constructor(props) {
    super(props);

    this.state = {
      address: this.props.address,
      showAddressError: this.props.showAddressError,
      isModalVisible: false,
    };
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        this.setState(update(this.state, {
          address: {
            addressString: { $set: place.address },
            location: {
              latitude: { $set: place.latitude },
              longitude: { $set: place.longitude },
            },
          },
          showAddressError: { $set: false },
        }));
      })
      .catch(error => console.log(error.message));
  }

  handleModalSubmit(address) {
    this.setState({ address });
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
              value={this.state.address.addressString}
              error={this.state.showAddressError ? 'Вкажіть адресу' : ''}
            />
          </TouchableOpacity>
        </View>

        <View>
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={this.state.address.location}
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
              address={this.state.address}
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
    addressString: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
  }).isRequired,
  showAddressError: PropTypes.bool.isRequired,
};

export default AddressField;
