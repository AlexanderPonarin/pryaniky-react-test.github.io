import axios from 'axios';

const url = 'https://test.v5.pryaniky.com';

const getToken = () => window.localStorage.getItem('token');

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use((config) => {
  config.headers['x-auth'] = getToken();
  return config;
});

export default instance;
