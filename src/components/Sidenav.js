import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, BackHandler, Image } from 'react-native';
import { Avatar, Drawer, ThemeProvider } from 'react-native-material-ui';
import { MOCKED_USER } from '../consts/mockedData';
import { uiTheme } from '../consts/styles';
import NavigationService from '../services/NavigationService';
import { userType } from '../types';

const merge = require('lodash.merge');

class Sidenav extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigation.state.isDrawerOpen) {
        NavigationService.closeDrawer();

        return true;
      }

      return false;
    });
  }

  // TODO: style sidenav header font color and make darkened background
  getHeaderStyles = () => {};

  getHeaderOptions = () => (
    this.props.user.profileImage
      ? {
        image: <Image source={{ uri: this.props.user.profileImage }} />,
        style: { ...this.getHeaderStyles() },
      }
      : {
        style: merge(
          { contentContainer: { backgroundColor: uiTheme.palette.primaryColor } },
          this.getHeaderStyles(),
        ),
      }
  );

  exitDialog = () => {
    Alert.alert(
      '',
      'Ви впевнені, що бажаєте вийти?',
      [
        { text: 'Ні', style: 'cancel' },
        {
          text: 'Так',
          onPress: () => {},
        },
      ],
    );
  };

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Drawer>
          <Drawer.Header {...this.getHeaderOptions()}>
            <Drawer.Header.Account
              avatar={
                this.props.user.avatar
                  ? <Avatar image={this.props.user.avatar} />
                  : <Avatar text={`${this.props.user.firstName[0]}${this.props.user.secondName[0]}`} />
              }
              footer={{
                dense: true,
                centerElement: {
                  primaryText: `${this.props.user.firstName} ${this.props.user.secondName}`,
                  secondaryText: this.props.user.email,
                },
              }}
            />
          </Drawer.Header>

          <Drawer.Section
            divider
            items={[
              {
                icon: 'place',
                value: 'Ваші місця',
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

          <Drawer.Section
            divider
            items={[
              {
                icon: 'info',
                value: 'Довідка',
                onPress: NavigationService.goToInfo,
              },
              {
                icon: 'chat-bubble',
                value: 'Надіслати відгук',
                onPress: NavigationService.goToAddResponse,
              },
            ]}
          />

          <Drawer.Section
            items={[
              {
                icon: 'exit-to-app',
                value: 'Вийти',
                onPress: this.exitDialog,
              },
            ]}
          />
        </Drawer>
      </ThemeProvider>
    );
  }
}

Sidenav.propTypes = {
  user: userType,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      isDrawerOpen: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

Sidenav.defaultProps = {
  user: MOCKED_USER,
};

export default Sidenav;
