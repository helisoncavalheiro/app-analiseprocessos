import axios from 'axios';

const url = process.env.REACT_APP_ANALISEPROCESSOS_API_HOST;

const Api = axios.create({
    baseURL: url
});

Api.interceptors.request.use(async config => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default Api;