import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR, ListItem, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaceholderImage from '../../../assets/images/placeholder.png';
import { uiTheme } from '../../../consts/styles';
import LocationService from '../../../services/LocationService';
import NavigationService from '../../../services/NavigationService';
import ProblemsService from '../../../services/ProblemsService';

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: 80,
    opacity: 0.5,
  },
  toolbarContainer: {
    position: 'absolute',
    zIndex: 1,
    width: Dimensions.get('window').width,
    height: uiTheme.toolbar.container.height + 40,
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
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    color: COLOR.black,
  },
});

class ProblemView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDataFetched: false,
    };
  }

  async componentDidMount() {
    const problem = await ProblemsService
      .getProblemById(this.props.navigation.getParam('id', null));

    this.setState({
      problem,
      isDataFetched: true,
    });

    if (this.state.problem.latitude && this.state.problem.longitude) {
      const address = (await LocationService.geocodePosition({
        longitude: this.state.problem.longitude,
        latitude: this.state.problem.latitude,
      })).formattedAddress;

      this.setState({ address });
    }
  }

  getMultilineListItem(icon, text) {
    return (
      <ListItem
        leftElement={icon}
        centerElement={
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>{text}</Text>
          </View>
        }
      />
    );
  }

  getListItem(icon, text, color) {
    return (
      <ListItem
        style={{
          primaryText: {
            fontSize: 16,
            color: color || COLOR.black,
          },
        }}
        leftElement={<MaterialCommunityIcon name={icon} size={24} color={color} />}
        centerElement={text}
      />
    );
  }

  getPage() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.80)', 'transparent']}
            style={styles.linearGradient}
          />

          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
            translucent
          />

          <Toolbar
            leftElement="arrow-back"
            // rightElement="edit"
            onLeftElementPress={NavigationService.goToHome}
            // onRightElementPress={() => {}}
            style={{ container: styles.toolbarContainer }}
          />

          {
            // this.state.problem.images.length === 0
            !this.state.problem.images
              ? <Image style={styles.image} source={PlaceholderImage} />
              : (
                <View style={styles.imageDimensions}>
                  <Swiper
                    dotColor={COLOR.white}
                    activeDotColor={COLOR.white}
                    activeDotStyle={{ width: 10, height: 10 }}
                    dotStyle={{ width: 6, height: 6 }}
                  >
                    {this.state.problem.images.map(image => (
                      <Image
                        style={styles.image}
                        source={{ uri: image }}
                      />
                    ))}
                  </Swiper>
                </View>
              )
          }

          <ScrollView style={{ marginTop: 10 }}>
            {this.getMultilineListItem('place', this.state.address)}

            {
              this.state.problem.problem_type
              && this.getListItem('alert', this.state.problem.problem_type.verbose_name)
            }

            {
              this.state.problem.description != null
              && this.getMultilineListItem('note', this.state.problem.description)
            }
          </ScrollView>
        </Fragment>
      </ThemeProvider>
    );
  }

  render() {
    return (
      this.state.isDataFetched
        ? this.getPage()
        : (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={uiTheme.palette.primaryColor} />
          </View>
        )
    );
  }
}

ProblemView.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProblemView;
