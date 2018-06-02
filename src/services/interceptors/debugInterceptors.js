import axios from 'axios';

axios.interceptors.request.use(
  config => config,
  error => {
    console.log(error.response.data);

    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  config => config,
  error => {
    console.log(error.response.data);

    return Promise.reject(error);
  },
);
