import axios from 'axios';
import AsyncStorage from 'rn-async-storage';

axios.interceptors.request.use(async config => {
  const newConfig = { ...config };
  const token = await AsyncStorage.getItem('token');

  if (token) {
    newConfig.headers.common.Authorization = `Token ${token}`;
  }

  return newConfig;
});
