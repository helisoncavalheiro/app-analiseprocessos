import Api from '../utils/api.js';
import Util from '../utils/Util.js';


function getUserCreations(userID) {
    return new Promise((resolve, reject) => {
        Api.get(`/issue/author/${userID}`)
            .then(res => {
                //this.setState({ loading: false });
                let data = Util.castArray(res.data);
                resolve({
                    code: res.status,
                    status: 'success',
                    msg: 'Sucesso ao recuperar os dados da API!',
                    data: data,
                })
            })
            .catch((err) => {
                //this.setState({ loading: false });
                reject({
                    apiResult: {
                        code: err.response.status,
                        msg: 'Houve um erro ao recuperar os dados da API.'
                    }
                })
            })
    });

}

export { getUserCreations };


