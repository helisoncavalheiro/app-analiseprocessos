import Api from '../utils/api.js';
import Util from '../utils/Util.js';

function getServicos() {
    return new Promise((resolve, reject) => {
        Api.get('/servico/all')
            .then(res => {

                let data = Util.castArray(res.data);

                resolve({
                    code: res.status,
                    msg: res.statusText,
                    data: data
                });

            })
            .catch(err => {
                reject({
                    code: err.response.status,
                    msg: err
                });
            });
    });
}

function getServico(id) {
    return new Promise((resolve, reject) => {

        Api.get(`/servico/${id}`)
            .then(result => {
                resolve({
                    code: result.status,
                    msg: result.statusText,
                    data: result.data
                })
            })
            .catch(error => {
                reject({
                    code: error.response.status,
                    msg: error
                });
            })
    });
}

export { getServicos, getServico }