import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { uiTheme } from '../consts/styles';
import Map from './Map';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
});

const Main = props => (
  <View style={styles.container}>
    <ThemeProvider uiTheme={uiTheme}>
      <Toolbar
        leftElement="menu"
        centerElement="Greenka"
        onLeftElementPress={() => props.navigation.openDrawer()}
      />
    </ThemeProvider>

    <Map />
  </View>
);

Main.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default Main;
