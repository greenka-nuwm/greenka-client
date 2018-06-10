import axios from 'axios';
import { ACTIVE_FILTERS } from '../consts/appConsts';

// TODO: error handling

class TreesService {
  static async getAllTrees() {
    return (await axios.get('/trees/all/')).data
      .map(tree => ({ ...tree, tree_state: ACTIVE_FILTERS[tree.tree_state] }));
  }

  static async getTreesTypes() {
    return (await axios.get('/trees/types/')).data
      .map(type => ({ id: type.id, value: type.name }));
  }

  static async getTreesSorts() {
    return (await axios.get('/trees/sorts/')).data
      .map(sort => ({ id: sort.id, value: sort.name, treeType: sort.tree_type }));
  }

  static async getTreesStates() {
    return (await axios.get('/trees/states/')).data
      .map(state => ({ id: state.id, value: state.name }));
  }

  static async create(tree) {
    return axios
      .post('/trees/', tree);
  }
}

export default TreesService;
