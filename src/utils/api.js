import axios from 'axios';

const url = 'http://localhost:8080';

const Api = axios.create({
    baseURL: url,
});

export default Api ;