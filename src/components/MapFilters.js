import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BottomNavigation, Button, COLOR, ThemeProvider } from 'react-native-material-ui';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PROBLEMS_ICONS, TREES_STATES } from '../consts/appConsts';
import { uiTheme } from '../consts/styles';
import ProblemsService from '../services/ProblemsService';

const styles = StyleSheet.create({
  treesFilters: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white,
  },
  problemsFilters: {
    flexDirection: 'column',
    backgroundColor: COLOR.white,
  },
  treesStatesColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  filtersButtons: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.grey400,
    elevation: 0,
  },
});

class MapFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      problemsTypes: [],
      filtersButtonsHeight: 0,
      treesHeight: 0,
      problemsHeight: 0,
    };
  }

  async componentDidMount() {
    const problemsTypes = await ProblemsService.getProblemsTypes();

    this.setState({ problemsTypes });
  }

  onShowFilters = () => {
    this.setState({
      filtersButtonsHeight: Math.abs(this.state.filtersButtonsHeight - 56),
    });

    if (this.state.treesHeight > 0) {
      this.setState({ treesHeight: 0 });
    }

    if (this.state.problemsHeight > 0) {
      this.setState({ problemsHeight: 0 });
    }
  };

  handleTreesPress = () => {
    this.setState({
      active: 'trees',
      treesHeight: Math.abs(this.state.treesHeight - 122),
      problemsHeight: 0,
    });
  };

  handleProblemsPress = () => {
    this.setState({
      active: 'problems',
      treesHeight: 0,
      problemsHeight: Math.abs(this.state.problemsHeight - 122),
    });
  };

  renderTreeStateButton(state) {
    return (
      <Button
        upperCase={false}
        key={state.key}
        text={state.label}
        onPress={() => this.props.onActiveTreesChange(state)}
        style={{
          text: {
            marginLeft: 10,
            color: this.props.activeFilters.includes(state.key)
              ? COLOR.black
              : COLOR.grey500,
          },
        }}
        icon={
          <MaterialCommunityIcon
            size={22}
            name={state.icon}
            style={{ color: state.color }}
          />
        }
      />
    );
  }

  renderTreesStatesColumn(states) {
    return (
      <View style={styles.treesStatesColumn}>
        {states.map(state => this.renderTreeStateButton(state))}
      </View>
    );
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

          {this.state.filtersButtonsHeight > 0 &&
          <BottomNavigation
            active={this.state.active}
            style={{ container: styles.filtersButtons }}
          >
            <BottomNavigation.Action
              key="trees"
              icon="local-florist"
              label="Дерева"
              onPress={this.handleTreesPress}
            />
            <BottomNavigation.Action
              key="problems"
              icon="report-problem"
              label="Проблеми"
              onPress={this.handleProblemsPress}
            />
          </BottomNavigation>
          }

          {this.state.treesHeight > 0 &&
          <View style={styles.treesFilters}>
            {this.renderTreesStatesColumn(TREES_STATES.slice(0, 3))}
            {this.renderTreesStatesColumn(TREES_STATES.slice(3, 6))}
          </View>
          }

          {this.state.problemsHeight > 0 &&
          <ScrollView
            style={styles.problemsFilters}
            contentContainerStyle={{ paddingTop: 10 }}
          >
            {this.state.problemsTypes.map(type => (
              <Button
                upperCase={false}
                key={type.name}
                text={type.value}
                onPress={() => this.props.onActiveProblemsChange(type.name)}
                style={{
                  text: {
                    marginLeft: 10,
                    color: this.props.activeFilters.includes(type.name)
                      ? COLOR.black
                      : COLOR.grey500,
                  },
                  container: {
                    justifyContent: 'flex-start',
                  },
                }}
                icon={Object.keys(PROBLEMS_ICONS).includes(type.name)
                  ? PROBLEMS_ICONS[type.name].icon
                  : PROBLEMS_ICONS.other.icon
                }
              />
            ))}
          </ScrollView>
          }
        </Fragment>
      </ThemeProvider>
    );
  }
}

MapFilters.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onActiveTreesChange: PropTypes.func.isRequired,
  onActiveProblemsChange: PropTypes.func.isRequired,
};

export default MapFilters;
