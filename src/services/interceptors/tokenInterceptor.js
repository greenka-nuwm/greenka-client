import axios from 'axios';
// import AsyncStorage from 'rn-async-storage';

axios.interceptors.request.use(config => {
  const newConfig = { ...config };
  let token;

  // AsyncStorage.getItem('token').then(data => {
  //   token = JSON.parse(data);
  // });

  if (token) {
    // newConfig.headers.common.Authorization = `Token ${token}`;
  }
  // TODO: delete when user authentication will be done
  newConfig.headers.common.Authorization = 'Token 0021e99efc3bf4fcbd3a673f2082ee502a74a3ec';

  return newConfig;
});
