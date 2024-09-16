import axios from 'axios';

const url = 'https://test.v5.pryaniky.com';

const instance = axios.create({
  baseURL: url,
  headers: {
    'x-auth': window.localStorage.getItem('token'),
  },
});

export default instance;
