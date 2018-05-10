import React from 'react';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import GreenkaToolbar from './src/components/toolbar/Toolbar';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green800,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const App = () => {
  const onLeftElementPress = () => {};

  return (
    <ThemeProvider uiTheme={uiTheme}>
      <GreenkaToolbar
        leftElement="menu"
        centerElement="greenka"
        onLeftElementPress={onLeftElementPress}
      />
    </ThemeProvider>
  );
};

export default App;
