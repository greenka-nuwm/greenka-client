import { StyleSheet } from 'react-native';
import { COLOR } from 'react-native-material-ui';

export const uiTheme = {
  palette: {
    primaryColor: COLOR.green800,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export const mapStyles = {
  flex: 3,
};

export const containerStyles = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'space-between',
};
