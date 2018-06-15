import { Dimensions, StyleSheet } from 'react-native';
import { COLOR } from 'react-native-material-ui';

export const uiTheme = {
  palette: {
    primaryColor: COLOR.green800,
    accentColor: COLOR.amber900,
  },
  toolbar: {
    container: {
      height: 56,
    },
  },
  listItem: {
    container: {
      backgroundColor: 'transparent',
    },
  },
};

export const drawerOverlayStyles = StyleSheet.create({
  container: StyleSheet.absoluteFillObject,
  mapContainer: StyleSheet.absoluteFillObject,
  mapDrawerOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.0,
    height: Dimensions.get('window').height,
    width: 10,
  },
});

export const mapStyles = {
  flex: 3,
};

export const containerStyles = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'space-between',
};

export const formContainer = {
  paddingHorizontal: 20,
};
