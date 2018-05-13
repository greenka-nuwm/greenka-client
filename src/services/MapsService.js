class MapsService {
  static getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
    });
  }
}

export default MapsService;
