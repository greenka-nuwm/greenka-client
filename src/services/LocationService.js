import { PermissionsAndroid } from 'react-native';

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
    return Boolean(PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION));
  }
}

export default LocationService;
