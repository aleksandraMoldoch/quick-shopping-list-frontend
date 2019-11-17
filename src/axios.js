import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://aleksandramoldoch.com:8080'
});

export default instance;
