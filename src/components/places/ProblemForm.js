import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import AddressField from './AddressField';

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
  },
});

class ProblemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      address: this.props.address,
      type: this.props.type,
      description: this.props.description,
      types: this.props.types,
      showNameError: this.props.showNameError,
      showAddressError: this.props.showAddressError,
      showTypeError: this.props.showTypeError,
    };
  }

  getForm() {
    return (
      <ScrollView>
        <View>
          <TextField
            multiline
            label="Назва*"
            value={this.state.name}
            error={this.state.showNameError ? 'Вкажіть ім\'я' : ''}
            onChangeText={value => {
              this.updateState(value, 'name');
              this.setState({ showNameError: false });
            }}
          />
        </View>

        <AddressField
          address={this.state.address}
          showAddressError={this.state.showAddressError}
        />

        <View>
          <Dropdown
            label="Тип*"
            value={this.state.type.value}
            error={this.state.showTypeError ? 'Вкажіть тип проблеми' : ''}
            data={this.state.types}
            onChangeText={(value, index) => {
              this.setState({
                type: { id: index, value },
                showTypeError: false,
              });
            }}
          />
        </View>

        <View>
          <TextField
            multiline
            label="Додатковий опис"
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.formContainer}>
        {this.getForm()}
      </View>
    );
  }
}

ProblemForm.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.shape({
    addressString: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  type: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  })).isRequired,
  showAddressError: PropTypes.bool.isRequired,
  showNameError: PropTypes.bool.isRequired,
  showTypeError: PropTypes.bool.isRequired,
};

export default ProblemForm;
