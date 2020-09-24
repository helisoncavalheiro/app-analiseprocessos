import Axios from 'axios';

export function login(user, password){
    return new Promise((resolve, reject)=>{
        Axios.post('/login', {user: user, password: password}, {baseURL: process.env.REACT_APP_ANALISEPROCESSOS_API_HOST})
            .then(res=>{
                console.log(res);
                resolve({
                    statusCode: res.status,
                    data: res.data,
                });
            })
            .catch(err=>{
                console.log(err)
                reject(err);
            });
    });
}

export function isAuthenticated(){
    return (sessionStorage.getItem("token") != null) ? true : false
}