import { PermissionsAndroid } from 'react-native';
import Geocoder from 'react-native-geocoder';

class LocationService {
  static getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
    });
  }

  static getLocationPermission() {
    return Boolean(PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ));
  }

  static geocodePosition(position) {
    return new Promise((resolve, reject) => {
      Geocoder.geocodePosition({ lat: position.latitude, lng: position.longitude })
        .then(result => resolve(result[0]))
        .catch(error => reject(error));
    });
  }
}

export default LocationService;
