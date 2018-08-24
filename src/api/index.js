import axios from 'axios';
import config from './config';

const path = `${config.protocol}://${config.host}${config.prefix}`;

axios.interceptors.response.use((response) => {
  // console.log(response);
  return response.data;
}, (err) => {
  console.log(err);
  return err.response;
});

export default axios.create({
  baseURL: path,
  withCredentials: true
});
