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

export { getServicos }