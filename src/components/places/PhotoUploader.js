import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { COLOR, IconToggle, ThemeProvider } from 'react-native-material-ui';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { uiTheme } from '../../consts/styles';

const styles = StyleSheet.create({
  label: { fontSize: 16, color: 'rgba(0, 0, 0, 0.38)' },
  mainContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 10,
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: COLOR.grey400,
    backgroundColor: COLOR.grey200,
    marginRight: 15,
    marginBottom: 15,
  },
  photoContainer: {
    width: 80,
    height: 80,
    marginRight: 15,
    marginBottom: 15,
  },
  deleteIcon: {
    backgroundColor: COLOR.black,
    borderRadius: 25,
    position: 'absolute',
    right: -12,
    top: -12,
  },
  transparentOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    alignSelf: 'stretch',
  },
  getPhotoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLOR.white,
    height: Dimensions.get('window').height / 2.7,
  },
  titleAndIcons: {
    flex: 1,
    alignSelf: 'stretch',
  },
  modalTitle: {
    padding: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: COLOR.black,
  },
  iconsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  closeButton: {
    alignSelf: 'flex-end',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: COLOR.black,
    backgroundColor: COLOR.grey100,
    borderTopColor: COLOR.grey300,
    borderTopWidth: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.7 / 4,
  },
});

class PhotoUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };
  }

  getFromLibrary = () => this.processPhoto(ImagePicker.launchImageLibrary);

  getFromCamera = () => this.processPhoto(ImagePicker.launchCamera);

  processPhoto = func => {
    this.setState({
      isModalVisible: false,
    });

    const options = {
      skipBackup: true,
      mediaType: 'photo',
      noData: true,
    };

    func(options, response => {
      const formData = new FormData();

      formData.append('img', {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
      });

      this.props.onAddImage(response.uri, formData);
    });
  };

  toggleModalVisibility = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render = () => (
    <ThemeProvider uiTheme={uiTheme}>
      <Fragment>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.label}>Додати фото</Text>

          <View style={styles.mainContainer}>
            <IconToggle
              name="add"
              size={25}
              color={COLOR.grey400}
              style={{ container: styles.addPhotoButton }}
              onPress={this.toggleModalVisibility}
            />

            {this.props.images.map((uri, index) => (
              <View key={`photo-${index}`} style={styles.photoContainer}>
                <Image source={{ uri }} style={{ ...StyleSheet.absoluteFillObject }} />
                <MaterialCommunityIcon
                  size={25}
                  color={COLOR.white}
                  name="close"
                  style={styles.deleteIcon}
                  onPress={() => this.props.onImageDelete(index)}
                />
              </View>
            ))}
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent
          visible={this.state.isModalVisible}
          onRequestClose={this.toggleModalVisibility}
        >
          <View style={styles.transparentOverlay} />

          <View onRequestClose={() => {}} style={styles.getPhotoContainer}>
            <View style={styles.titleAndIcons}>
              <Text style={styles.modalTitle}>
                Завершити дію за допомогою
              </Text>

              <View style={styles.iconsContainer}>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.getFromLibrary}>
                  <MaterialIcon size={60} name="photo-library" />
                  <Text>Галерея</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.getFromCamera}>
                  <MaterialIcon size={60} name="photo-camera" />
                  <Text>Фото</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.closeButton} onPress={this.toggleModalVisibility}>
              Скасувати
            </Text>
          </View>
        </Modal>
      </Fragment>
    </ThemeProvider>
  );
}

PhotoUploader.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onImageDelete: PropTypes.func.isRequired,
  onAddImage: PropTypes.func.isRequired,
};

export default PhotoUploader;
