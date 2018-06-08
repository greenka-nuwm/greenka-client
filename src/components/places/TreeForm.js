import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { formContainer } from '../../consts/styles';
import AddressField from './AddressField';

class TreeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: this.props.address,
      state: this.props.state,
      type: this.props.type,
      sort: this.props.sort,
      description: this.props.description,
      types: this.props.types,
      sorts: this.props.sorts,
      states: this.props.states,
      allSorts: this.props.allSorts,
      showAddressError: this.props.showAddressError,
      showStateError: this.props.showStateError,
    };
  }

  getForm() {
    return (
      <ScrollView>
        <AddressField
          address={this.state.address}
          showAddressError={this.state.showAddressError}
        />

        <View>
          <Dropdown
            label="Стан*"
            value={this.state.state.value}
            error={this.state.showStateError ? 'Вкажіть стан дерева' : ''}
            data={this.state.states}
            onChangeText={(value, index) => {
              this.setState({
                state: { id: index, value },
                showStateError: false,
              });
            }}
          />
        </View>

        <View>
          <Dropdown
            label="Вид дерева"
            value={this.state.type.value}
            data={this.state.types}
            onChangeText={(value, index) => {
              this.setState({
                type: { id: index, value },
                sort: { id: null, value: '' },
                sorts: this.state.allSorts.filter(sort => sort.treeType === (index + 1)),
              });
            }}
          />
        </View>

        <View>
          <Dropdown
            label="Порода дерева"
            value={this.state.sort.value}
            data={this.state.sorts}
            onChangeText={(value, index) => this.setState({ sort: { id: index, value } })}
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
      <View style={formContainer}>
        {this.getForm()}
      </View>
    );
  }
}

TreeForm.propTypes = {
  address: PropTypes.shape({
    addressString: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  state: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  sort: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  })).isRequired,
  sorts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  })).isRequired,
  states: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  })).isRequired,
  allSorts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  })).isRequired,
  showAddressError: PropTypes.bool.isRequired,
  showStateError: PropTypes.bool.isRequired,
};

export default TreeForm;
