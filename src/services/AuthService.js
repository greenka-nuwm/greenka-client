import axios from 'axios';
import AsyncStorage from 'rn-async-storage';

// TODO: error handling

class AuthService {
  static async login(data) {
    const token = (await axios.post('/token/', data)).data;

    if (token) {
      AsyncStorage.setItem('token', token);
    }
  }

  static async register(data) {
    return (await axios.post('/user/register', data)).data;
  }
}

export default AuthService;
