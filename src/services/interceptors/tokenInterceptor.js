import axios from 'axios';
import AsyncStorage from 'rn-async-storage';

axios.interceptors.request.use(config => {
  const newConfig = { ...config };
  let token;

  AsyncStorage.getItem('token').then(data => {
    token = JSON.parse(data);
  });

  if (token) {
    // newConfig.headers.common.Authorization = `Token ${token}`;
  }
  // TODO: delete when user authentication will be done
  newConfig.headers.common.Authorization = 'Token aac57bf2874787388c8baa12ecbf0fefe0c5737f';

  return newConfig;
});
