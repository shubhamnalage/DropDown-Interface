import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Update with the correct backend server URL
});

export default instance;
