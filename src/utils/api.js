import axios from 'axios';

const url = process.env.REACT_APP_ANALISEPROCESSOS_API_HOST;
const token = sessionStorage.getItem('token');

const Api = axios.create({
    baseURL: url,
    headers:{
        'Authorization': `Bearer ${token}`
    }

});


export default Api;