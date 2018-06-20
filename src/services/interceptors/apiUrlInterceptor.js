import axios from 'axios';
import { API_URL } from '../../consts/appConsts';

axios.interceptors.request.use(config => ({
  ...config,
  url: `${API_URL}${config.url}`,
}));
