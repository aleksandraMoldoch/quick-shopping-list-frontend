import axios from 'axios';

export let URLaddress = 'http://aleksandramoldoch.com:8080';

export default axios.create({
    baseURL: URLaddress
});
