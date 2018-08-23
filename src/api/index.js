import axios from 'axios';
import config from './config';

const path = `${config.protocol}://${config.host}${config.prefix}`;

export default axios.create({
  baseURL: path
});
