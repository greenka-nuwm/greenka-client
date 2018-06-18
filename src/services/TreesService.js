import axios from 'axios';
import { Dimensions } from 'react-native';
import { ACTIVE_FILTERS } from '../consts/appConsts';

// TODO: error handling

class TreesService {
  static async getTreesInRadius(region) {
    const { width } = Dimensions.get('window');
    const radius = Math.log2(360 * ((width / 256) / region.longitudeDelta)) + 1;

    return (await axios.get('/trees/', {
      params: {
        radius,
        center: `${region.latitude},${region.longitude}`,
      },
    })).data.map(tree => ({ ...tree, tree_state: ACTIVE_FILTERS[tree.tree_state - 1] }));
  }

  static async getTreeById(id) {
    return (await axios.get(`/trees/${id}/`)).data;
  }

  static async getTreesTypes() {
    return (await axios.get('/trees/types/')).data
      .map(type => ({ id: type.id, value: type.name }));
  }

  static async getTreesSorts() {
    return (await axios.get('/trees/sorts/')).data
      .map(sort => ({ id: sort.id, value: sort.name, treeType: sort.tree_type }));
  }

  static async create(tree) {
    return axios
      .post('/trees/', tree);
  }
}

export default TreesService;
