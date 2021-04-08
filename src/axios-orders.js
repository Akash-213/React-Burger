import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-f1a12-default-rtdb.firebaseio.com/'
});

export default instance;