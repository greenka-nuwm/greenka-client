import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  BottomNavigation,
  Button,
  COLOR,
  ThemeProvider,
} from 'react-native-material-ui';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { uiTheme } from '../consts/styles';
import { TREES_FILTERS } from '../consts/appConsts';

class MapFilters extends Component {
  constructor(props) {
    super(props);

    this.onShowFilters = this.onShowFilters.bind(this);
    this.onTabPress = this.onTabPress.bind(this);

    this.state = {
      filtersButtonsHeight: 0,
      treesHeight: 0,
      problemsHeight: 0,
    };
  }

  onShowFilters() {
    this.setState({
      filtersButtonsHeight: Math.abs(this.state.filtersButtonsHeight - 56),
    });

    if (this.state.treesHeight > 0) {
      this.setState({ treesHeight: 0 });
    }

    if (this.state.problemsHeight > 0) {
      this.setState({ problemsHeight: 0 });
    }
  }

  onTabPress(tab) {
    this.setState({ active: tab });

    if (tab === 'trees') {
      this.setState({
        treesHeight: Math.abs(this.state.treesHeight - 122),
        problemsHeight: 0,
      });
    }

    if (tab === 'problems') {
      this.setState({
        treesHeight: 0,
        problemsHeight: Math.abs(this.state.problemsHeight - 122),
      });
    }
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <Button
            raised
            primary
            style={{ container: { height: 56, elevation: 0 } }}
            icon="place"
            text="Показати на карті"
            onPress={this.onShowFilters}
          />

          <BottomNavigation
            active={this.state.active}
            style={{
              container: {
                height: this.state.filtersButtonsHeight,
                borderBottomWidth: 0.5,
                borderBottomColor: COLOR.grey400,
                elevation: 0,
              },
            }}
          >
            <BottomNavigation.Action
              key="trees"
              icon="local-florist"
              label="Дерева"
              onPress={() => this.onTabPress('trees')}
            />
            <BottomNavigation.Action
              key="problems"
              icon="report-problem"
              label="Проблеми"
              onPress={() => this.onTabPress('problems')}
            />
          </BottomNavigation>

          <View
            style={{
              flexDirection: 'row',
              height: this.state.treesHeight,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLOR.white,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              {TREES_FILTERS.slice(0, 3).map(tab => (
                <Button
                  upperCase={false}
                  key={tab.key}
                  text={tab.label}
                  onPress={() => this.props.onActiveTabsChange(tab)}
                  style={{
                    text: {
                      marginLeft: 10,
                      color: this.props.activeFilters.includes(tab.key)
                        ? COLOR.black
                        : COLOR.grey500,
                    },
                  }}
                  icon={
                    <MaterialCommunityIcon
                      size={22}
                      name={tab.icon}
                      style={{ color: tab.color }}
                    />
                  }
                />
              ))}
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              {TREES_FILTERS.slice(3).map(tab => (
                <Button
                  upperCase={false}
                  key={tab.key}
                  text={tab.label}
                  onPress={() => this.props.onActiveTabsChange(tab)}
                  style={{
                    text: {
                      marginLeft: 10,
                      color: this.props.activeFilters.includes(tab.key)
                        ? COLOR.black
                        : COLOR.grey500,
                    },
                  }}
                  icon={
                    <MaterialCommunityIcon
                      size={22}
                      name={tab.icon}
                      style={{ color: tab.color }}
                    />
                  }
                />
              ))}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: this.state.problemsHeight,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLOR.white,
            }}
          />
        </Fragment>
      </ThemeProvider>
    );
  }
}

MapFilters.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onActiveTabsChange: PropTypes.func.isRequired,
};

export default MapFilters;
