import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
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
import { NavigationActions } from 'react-navigation';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ACTIVE_FILTERS, TREES_FILTERS } from '../../../consts/appConsts';
import { uiTheme } from '../../../consts/styles';
import PlaceholderImage from '../../../assets/images/placeholder.png';
import LocationService from '../../../services/LocationService';
import TreesService from '../../../services/TreesService';

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
  listItemLeftElement: {
    color: uiTheme.palette.primaryColor,
  },
  listItemPrimaryText: {
    fontSize: 16,
    color: COLOR.black,
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    color: COLOR.black,
  },
});

class TreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: this.props.navigation.getParam('tree', {}),
      address: '',
      states: [],
      types: [],
      sorts: [],
    };
  }

  async componentDidMount() {
    const states = await TreesService.getTreesStates();
    const types = await TreesService.getTreesTypes();
    const sorts = await TreesService.getTreesSorts();

    this.setState({
      states,
      types,
      sorts,
    });

    if (this.state.tree.latitude && this.state.tree.longitude) {
      const address = (await LocationService.geocodePosition({
        longitude: this.state.tree.longitude,
        latitude: this.state.tree.latitude,
      })).formattedAddress;

      this.setState({ address });
    }
  }

  static getMultilineListItem(icon, text) {
    return (
      <ListItem
        style={{ leftElement: styles.listItemLeftElement }}
        leftElement={icon}
        centerElement={
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>{text}</Text>
          </View>
        }
      />
    );
  }

  static getListItem(icon, text, color) {
    return (
      <ListItem
        style={{
          leftElement: styles.listItemLeftElement,
          primaryText: styles.listItemPrimaryText,
        }}
        leftElement={
          <MaterialCommunityIcon
            name={icon}
            size={24}
            color={color || uiTheme.palette.primaryColor}
          />
        }
        centerElement={text}
      />
    );
  }

  render() {
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
            onLeftElementPress={() => {
              this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
            }}
            onRightElementPress={() => {}}
            style={{ container: styles.toolbarContainer }}
          />

          {this.state.tree.images.length === 0 &&
          <Image
            style={styles.image}
            source={PlaceholderImage}
          />
          }

          {this.state.tree.images.length > 0 &&
          <View style={styles.imageDimensions}>
            <Swiper
              dotColor={COLOR.white}
              activeDotColor={COLOR.white}
              activeDotStyle={{ width: 10, height: 10 }}
              dotStyle={{ width: 6, height: 6 }}
            >
              {this.state.tree.images.map(image => (
                <Image
                  style={styles.image}
                  source={{ uri: image }}
                />
              ))}
            </Swiper>
          </View>
          }

          <ScrollView style={{ marginTop: 10 }}>
            {TreeView.getMultilineListItem('place', this.state.address)}

            {
              this.state.states.length > 0
              && this.state.tree.tree_state
              && TreeView.getListItem(
                'heart-pulse',
                this.state.states[ACTIVE_FILTERS.indexOf(this.state.tree.tree_state)].value,
                TREES_FILTERS[ACTIVE_FILTERS.indexOf(this.state.tree.tree_state)].color,
              )
            }

            {
              this.state.types.length > 0
              && this.state.tree.tree_type
              && TreeView.getListItem(
                'pine-tree',
                this.state.types[this.state.tree.tree_type - 1].value,
              )
            }

            {
              this.state.sorts.length > 0
              && this.state.tree.tree_sort
              && TreeView.getListItem(
                'tree',
                this.state.sorts[this.state.tree.tree_sort - 1].value,
              )
            }

            {
              this.state.tree.description !== ''
              && TreeView.getMultilineListItem('note', this.state.tree.description)
            }
          </ScrollView>
        </Fragment>
      </ThemeProvider>
    );
  }
}

TreeView.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default TreeView;
