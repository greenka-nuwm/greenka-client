import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Avatar,
  COLOR, ListItem, ThemeProvider, Toolbar,
} from 'react-native-material-ui';
import AsyncStorage from 'rn-async-storage';
import defaultBackground from '../assets/images/defaultBackground.png';
import PlaceholderImage from '../assets/images/placeholder.png';
import { uiTheme } from '../consts/styles';
import NavigationService from '../services/NavigationService';

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    zIndex: 9,
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: 100,
    opacity: 0.5,
  },
  toolbarContainer: {
    position: 'absolute',
    zIndex: 10,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
  },
  imageDimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    resizeMode: 'cover',
  },
  avatar: {
    position: 'absolute', left: 25, top: 90,
  },
});

// TODO: delete eslint-disable-next-line
class Profile extends Component {
  async componentDidMount() {
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    this.setState({ user });
  }

  getProfileImage = () => {
    const { user: { profileImage } } = this.state;
    const style = { height: 180, ...StyleSheet.absoluteFill };

    return profileImage
      ? <Image style={style} source={{ uri: profileImage }} />
      : <Image style={style} source={defaultBackground} />;
  };

  getAvatarImage = () => (
    <Avatar
      image={(
        <Image
          size={60}
          style={{ container: styles.avatar, borderRadius: 50, ...StyleSheet.absoluteFillObject }}
          // eslint-disable-next-line react/destructuring-assignment
          source={{ uri: this.state.user.avatar }}
        />
      )}
    />
  );

  getAvatarWithText = () => {
    const { user: { first_name: firstName, last_name: lastName, username } } = this.state;
    const text = firstName && lastName ? `${firstName[0]}${lastName[0]}` : `${username[0]}`;

    return <Avatar text={text} size={60} style={{ container: styles.avatar }} />;
  };

  // eslint-disable-next-line react/destructuring-assignment
  getAvatar = () => (this.state.user.avatar ? this.getAvatarImage() : this.getAvatarWithText());

  getPage() {
    const {
      user: {
        username, first_name: firstName, last_name: lastName, email,
      },
    } = this.state;
    const name = firstName && lastName ? `${firstName} ${lastName}` : username;

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.80)', 'transparent']}
            style={styles.linearGradient}
          />

          <StatusBar
            backgroundColor="rgba(0, 0, 0, 0.3)"
            barStyle="light-content"
            translucent
          />

          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={NavigationService.goToHome}
            rightElement={{
              menu: {
                icon: 'more-vert',
                labels: ['Вийти'],
              },
            }}
            onRightElementPress={label => { console.log(label); }}
            style={{ container: styles.toolbarContainer }}
          />

          <View>
            {this.getProfileImage()}

            <View>
              {this.getAvatar()}

              <Text style={{
                flex: 1,
                flexWrap: 'wrap',
                fontSize: 16,
                color: COLOR.white,
                position: 'absolute',
                left: 100,
                top: 110,
              }}
              >
                {name}
              </Text>
            </View>
          </View>
        </Fragment>
      </ThemeProvider>
    );
  }

  render() {
    return (
      this.state
        ? this.getPage()
        : (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={uiTheme.palette.primaryColor} />
          </View>
        )
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      isDrawerOpen: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Profile;
