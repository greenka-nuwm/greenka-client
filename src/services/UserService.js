import axios from 'axios';

// TODO: error handling

class UserService {
  static async getUserProfile() {
    return (await axios.get('/user/self/profile/')).data;
  }

  static async getUserTrees() {
    return (await axios.get('/user/self/trees/')).data;
  }

  static async getUserProblems() {
    return (await axios.get('/user/self/problems/')).data;
  }
}

export default UserService;
