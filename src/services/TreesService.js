import axios from 'axios';

// TODO: error handling

class TreesService {
  static async getTreesTypes() {
    return (await axios.get('/trees/types')).data
      .map(type => ({ id: type.id, value: type.name }));
  }

  static async getTreesSorts() {
    return (await axios.get('/trees/sorts')).data
      .map(sort => ({ id: sort.id, value: sort.name, treeType: sort.tree_type }));
  }

  // TODO: integrate with endpoint
  static getTreesStates() {
    return [
      { id: 0, value: 'Здорове' },
      { id: 1, value: 'Пошкоджене' },
      { id: 2, value: 'Помирає' },
      { id: 3, value: 'Напівсухе та сухе' },
      { id: 4, value: 'Топінг' },
      { id: 5, value: 'Вражене омелою' },
    ];
  }

  static async create(tree) {
    return axios
      .post('/trees', tree);
  }
}

export default TreesService;
