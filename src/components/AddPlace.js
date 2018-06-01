import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { uiTheme } from '../consts/styles';

class AddPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {
        title: {
          value: this.props.place.title,
          label: 'Назва',
          icon: <MaterialCommunityIcon name="file-document" />,
        },
        address: {
          value: this.props.place.address,
          label: 'Адреса',
          icon: <MaterialIcon name="place" />,
        },
        state: {
          value: this.props.place.state,
          label: 'Стан',
          icon: <MaterialCommunityIcon name="heart-pulse" />,
          dropdown: true,
          dropdownData: [
            { value: 'Здорове' },
            { value: 'Пошкоджене' },
            { value: 'Помирає' },
            { value: 'Напівсухе та сухе' },
            { value: 'Топінг' },
            { value: 'Вражене омелою' },
          ],
        },
        type: {
          value: this.props.place.type,
          label: 'Вид дерева',
          icon: <MaterialCommunityIcon name="tree" />,
          iconComponent: MaterialCommunityIcon,
        },
        sort: {
          value: this.props.place.sort,
          label: 'Порода дерева',
          icon: <MaterialCommunityIcon name="pine-tree" />,
        },
        notes: {
          value: this.props.place.notes,
          label: 'Додатковий опис',
          icon: <MaterialIcon name="note" />,
        },
      },
    };
  }

  getTextField(propName, field) {
    return (
      <View key={`${field.label}-field`} >
        {field.icon}

        <TextField
          label={field.label}
          value={field.value}
          onChangeText={value => this.updateState(value, propName)}
        />
      </View>
    );
  }

  getDropdown(propName, field) {
    return (
      <Dropdown
        key={`${field.label}-field`}
        label={field.label}
        value={field.value}
        data={field.dropdownData}
        onChangeText={value => this.updateState(value, propName)}
      />
    );
  }

  getForm() {
    const form = [];

    Object.entries(this.state.place).forEach(field => form.push(
      Object.keys(field[1]).includes('dropdown')
        ? this.getDropdown(field[0], field[1])
        : this.getTextField(field[0], field[1]),
    ));

    return form;
  }

  updateState(value, propName) {
    const newState = update(this.state, {
      place: {
        [propName]: {
          value: { $set: value },
        },
      },
    });

    this.setState(newState);
  }

  render() {
    return (
      <Fragment>
        <ThemeProvider uiTheme={uiTheme}>
          <Toolbar
            leftElement="menu"
            centerElement="Додати місце"
            onLeftElementPress={() => this.props.navigation.openDrawer()}
          />
        </ThemeProvider>

        <View
          style={{
            padding: 20,
          }}
        >
          {this.getForm()}
        </View>
      </Fragment>
    );
  }
}

AddPlace.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
  place: PropTypes.shape({
    title: PropTypes.string,
    address: PropTypes.string,
    state: PropTypes.string,
    type: PropTypes.string,
    sort: PropTypes.string,
    notes: PropTypes.string,
  }),
};

AddPlace.defaultProps = {
  place: {
    title: '',
    address: '',
    state: '',
    type: '',
    sort: '',
    notes: '',
  },
};

export default AddPlace;
