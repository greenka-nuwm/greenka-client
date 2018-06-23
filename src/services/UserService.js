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

  static async AddFeedback(body) {
    return axios.post('/user/feedback/', { body });
  }
}

export default UserService;
