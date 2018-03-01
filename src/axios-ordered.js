import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilderreactapp.firebaseio.com/'
});

export default instance;