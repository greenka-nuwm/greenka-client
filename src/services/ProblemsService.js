import axios from 'axios';
import { Dimensions } from 'react-native';

// TODO: error handling

class ProblemsService {
  static async getProblemsInRadius(region) {
    const { width } = Dimensions.get('window');
    const radius = Math.log2(360 * ((width / 256) / region.longitudeDelta)) + 1;

    return (await axios.get('/problems/', {
      params: {
        radius,
        center: `${region.latitude},${region.longitude}`,
      },
    })).data;
  }

  static async getProblemById(id) {
    return (await axios.get(`/problems/${id}/`)).data;
  }

  static async getProblemsTypes() {
    return (await axios.get('/problems/types/')).data
      .map(type => ({
        id: type.id,
        value: type.verbose_name,
        name: type.name,
      }));
  }

  static async create(problem) {
    return (await axios.post('/problems/', problem)).data;
  }

  static async uploadPhoto(id, photo) {
    const url = `/problems/${id}/image/`;

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return axios.post(url, photo, config);
  }
}

export default ProblemsService;
