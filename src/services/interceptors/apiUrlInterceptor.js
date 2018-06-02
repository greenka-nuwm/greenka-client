import axios from 'axios';

const API_URL = 'http://192.168.0.55:8000';

axios.interceptors.request.use(config => ({
  ...config,
  url: `${API_URL}${config.url}`,
}));
