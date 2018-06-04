import axios from 'axios';

axios.interceptors.request.use(
  config => config,
  error => {
    console.log(error.response ? error.response.data : error.response);

    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  config => config,
  error => {
    console.log(error.response ? error.response.data : error.response);

    return Promise.reject(error);
  },
);
