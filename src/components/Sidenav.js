import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Drawer, ThemeProvider } from 'react-native-material-ui';
import { MOCKED_USER } from '../consts/mockedData';
import { uiTheme } from '../consts/styles';

const merge = require('lodash.merge');

const Sidenav = ({ navigation, user }) => {
  // TODO: style sidenav header font color and make darkened background
  const getHeaderStyles = () => {};

  const getHeaderOptions = () => (
    user.profileImage
      ? {
        image: <Image source={{ uri: user.profileImage }} />,
        style: { ...getHeaderStyles() },
      }
      : {
        style: merge(
          { contentContainer: { backgroundColor: uiTheme.palette.primaryColor } },
          getHeaderStyles(),
        ),
      }
  );

  const exitDialog = () => {
    Alert.alert(
      '',
      'Ви впевнені, що бажаєте вийти?',
      [
        {
          text: 'Ні',
          style: 'cancel',
        },
        {
          text: 'Так',
          onPress: () => {},
        },
      ],
    );
  };

  return (
    <ThemeProvider uiTheme={uiTheme}>
      <Drawer>
        <Drawer.Header {...getHeaderOptions()}>
          <Drawer.Header.Account
            avatar={
              user.avatar
                ? <Avatar image={user.avatar} />
                : <Avatar text={`${user.firstName[0]}${user.secondName[0]}`} />
            }
            footer={{
              dense: true,
              centerElement: {
                primaryText: `${user.firstName} ${user.secondName}`,
                secondaryText: user.email,
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
              onPress: () => navigation.dispatch(NavigationActions.navigate({ routeName: 'Places' })),
            },
            {
              icon: 'add-location',
              value: 'Внести дерево',
              onPress: () => navigation.dispatch(NavigationActions.navigate({ routeName: 'AddTree' })),
            },
            {
              icon: 'add-location',
              value: 'Описати проблему',
              onPress: () => navigation.dispatch(NavigationActions.navigate({ routeName: 'AddProblem' })),
            },
          ]}
        />

        <Drawer.Section
          divider
          items={[
            {
              icon: 'info',
              value: 'Довідка',
              onPress: () => navigation.dispatch(NavigationActions.navigate({ routeName: 'Info' })),
            },
            {
              icon: 'chat-bubble',
              value: 'Надіслати відгук',
              onPress: () => navigation.dispatch(NavigationActions.navigate({ routeName: 'AddResponse' })),
            },
          ]}
        />

        <Drawer.Section
          items={[
            {
              icon: 'exit-to-app',
              value: 'Вийти',
              onPress: () => exitDialog(),
            },
          ]}
        />
      </Drawer>
    </ThemeProvider>
  );
};

Sidenav.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    secondName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    profileImage: PropTypes.string,
  }),
};

Sidenav.defaultProps = {
  user: MOCKED_USER,
};

export default Sidenav;
