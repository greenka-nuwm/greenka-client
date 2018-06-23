import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import { COLOR } from 'react-native-material-ui';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from 'rn-async-storage';
import { uiTheme } from '../consts/styles';
import LocationService from '../services/LocationService';
import NavigationService from '../services/NavigationService';

const styles = StyleSheet.create({
  upperButton: {
    flex: 1,
    marginRight: -10,
    position: 'absolute',
    bottom: 116,
    elevation: 3,
  },
  bottomButton: {
    flex: 1,
    marginRight: -10,
    position: 'absolute',
    bottom: 46,
  },
  actionButtonIcon: {
    fontSize: 20,
    color: 'white',
  },
  myLocationIcon: {
    fontSize: 20,
    color: uiTheme.palette.accentColor,
  },
});

class GreenkaActionButton extends Component {
  getLocation = async () => {
    if (LocationService.getLocationPermission()) {
      const position = await LocationService.getCurrentPosition();

      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      await AsyncStorage.setItem('location', JSON.stringify(location));

      this.props.onUserLocationChange(location);
    }
  };

  renderIcon = () => <MaterialIcon name="my-location" style={styles.myLocationIcon} />;

  render = () => (
    <Fragment>
      {!this.props.isSkippedLogin &&
      <ActionButton
        style={styles.upperButton}
        buttonColor={uiTheme.palette.accentColor}
        useNativeFeedback
        fixNativeFeedbackRadius
      >
        <ActionButton.Item
          buttonColor={COLOR.green300}
          size={50}
          title="Внести дерево"
          onPress={NavigationService.goToAddTree}
        >
          <MaterialIcon name="local-florist" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor={COLOR.red300}
          size={50}
          title="Описати проблему"
          onPress={NavigationService.goToAddProblem}
        >
          <MaterialIcon name="report-problem" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      }

      <ActionButton
        style={styles.bottomButton}
        buttonColor={COLOR.white}
        fixNativeFeedbackRadius
        useNativeFeedback
        nativeFeedbackRippleColor="rgba(0, 0, 0, 0.3)"
        renderIcon={this.renderIcon}
        onPress={this.getLocation}
      />
    </Fragment>
  );
}

GreenkaActionButton.propTypes = {
  isSkippedLogin: PropTypes.bool.isRequired,
  onUserLocationChange: PropTypes.func.isRequired,
};

export default GreenkaActionButton;
