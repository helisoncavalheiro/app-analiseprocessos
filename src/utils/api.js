import axios from 'axios';

const url = process.env.REACT_APP_ANALISEPROCESSOS_API_HOST;

const Api = axios.create({
    baseURL: url,
});

export default Api ;