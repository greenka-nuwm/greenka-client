import axios from 'axios';

axios.interceptors.request.use(
  config => {
    console.log(
      `Request: ${config.method.toUpperCase()} ${config.url} ${JSON.stringify(
        config.params,
      )} ${JSON.stringify(config.data)}`,
    );

    return config;
  },
  error => {
    console.log(error.response ? error.response.data : error.response);

    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  config => {
    console.log(`Response: ${config.status}, ${JSON.stringify(config.data)}`);

    return config;
  },
  error => {
    console.log(error.response ? error.response.data : error.response);

    return Promise.reject(error);
  },
);
