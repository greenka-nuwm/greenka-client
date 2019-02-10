import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Avatar, Drawer, ThemeProvider } from 'react-native-material-ui';
import AsyncStorage from 'rn-async-storage';
import defaultBackground from '../assets/images/defaultBackground.png';
import { uiTheme } from '../consts/styles';
import NavigationService from '../services/NavigationService';

// {
//   icon: 'info',
//     value: 'Довідка',
//   onPress: NavigationService.goToInfo,
// },

// TODO: delete eslint-disable-next-line
class Sidenav extends Component {
  async componentDidMount() {
    const isSkippedLogin = Boolean(JSON.parse(
      await AsyncStorage.getItem('isSkippedLogin'),
    ));
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    BackHandler.addEventListener('hardwareBackPress', () => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props.navigation.state.isDrawerOpen) {
        NavigationService.closeDrawer();

        return true;
      }

      return false;
    });

    this.setState({ isSkippedLogin, user });
  }

  // TODO: style sidenav header font color and make darkened background
  getHeaderStyles = () => ({
    contentContainer: {
      height: 194,
    },
  });

  getProfileImage = () => {
    const { user: { profileImage } } = this.state;

    return profileImage
      ? <Image source={{ uri: profileImage }} /> : <Image source={defaultBackground} />;
  };

  getHeaderOptions = () => ({
    image: this.getProfileImage(),
    style: { ...this.getHeaderStyles() },
  });

  getAvatarImage = () => (
    <Avatar
      image={(
        <Image
          style={{ borderRadius: 50, ...StyleSheet.absoluteFillObject }}
          // eslint-disable-next-line react/destructuring-assignment
          source={{ uri: this.state.user.avatar }}
        />
      )}
    />
  );


  getAvatarWithText = () => {
    const { user: { first_name: firstName, last_name: lastName, username } } = this.state;
    const text = firstName && lastName ? `${firstName[0]}${lastName[0]}` : `${username[0]}`;

    return <Avatar text={text} />;
  };

  // eslint-disable-next-line react/destructuring-assignment
  getAvatar = () => (this.state.user.avatar ? this.getAvatarImage() : this.getAvatarWithText());

  getHeader = () => {
    const {
      user: {
        username, first_name: firstName, last_name: lastName, email,
      },
    } = this.state;
    const name = firstName && lastName ? `${firstName} ${lastName}` : username;

    return (
      <Drawer.Header {...this.getHeaderOptions()}>
        <Drawer.Header.Account
          avatar={this.getAvatar()}
          footer={{
            dense: true,
            centerElement: {
              primaryText: name,
              secondaryText: email || undefined,
            },
          }}
        />
      </Drawer.Header>
    );
  };

  getPlacesSection = () => (
    <Drawer.Section
      divider
      items={[
        {
          icon: 'place',
          value: 'Мої місця',
          onPress: NavigationService.goToPlaces,
        },
        {
          icon: 'local-florist',
          value: 'Внести дерево',
          onPress: NavigationService.goToAddTree,
        },
        {
          icon: 'report-problem',
          value: 'Описати проблему',
          onPress: NavigationService.goToAddProblem,
        },
      ]}
    />
  );

  getDrawerForAuthentificatedUser = () => (
    <Drawer>
      {this.getHeader()}

      {this.getPlacesSection()}

      <Drawer.Section
        divider
        items={[
          {
            icon: 'chat-bubble',
            value: 'Надіслати відгук',
            onPress: NavigationService.goToAddFeedback,
          },
        ]}
      />

      <Drawer.Section
        items={[
          {
            icon: 'exit-to-app',
            value: 'Вийти',
            onPress: this.renderExitDialog,
          },
        ]}
      />
    </Drawer>
  );

  renderExitDialog = () => {
    Alert.alert(
      '',
      'Ви впевнені, що бажаєте вийти?',
      [
        { text: 'Ні', style: 'cancel' },
        {
          text: 'Так',
          onPress: async () => {
            await AsyncStorage.setItem('isSkippedLogin', 'false');
            await AsyncStorage.setItem('token', '');

            NavigationService.goToEnter();
          },
        },
      ],
    );
  };

  getDrawerForUnauthenticatedUser = () => (
    <Drawer>
      <Drawer.Section
        items={[
          {
            icon: 'exit-to-app',
            value: 'Увійти',
            onPress: NavigationService.goToLogin,
          },
        ]}
        style={{
          container: {
            paddingTop: 30,
          },
        }}
      />
    </Drawer>
  );

  render = () => {
    if (!this.state) {
      return null;
    }

    const { isSkippedLogin } = this.state;

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <StatusBar
            backgroundColor="rgba(0, 0, 0, 0.3)"
            barStyle="light-content"
            translucent
          />

          {!isSkippedLogin && this.getDrawerForAuthentificatedUser()}

          {isSkippedLogin && this.getDrawerForUnauthenticatedUser()}
        </Fragment>
      </ThemeProvider>
    );
  }
}

Sidenav.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      isDrawerOpen: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Sidenav;
