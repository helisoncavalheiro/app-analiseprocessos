import Api from '../utils/api.js';
import Util from '../utils/Util.js';

async function getAllUsers() {
    Api.get('/user/list')
        .then(res => {
            let data = Util.castArray(res.data);
            this.setState({
                users: data,
                apiResult: {
                    status: 'success',
                    msg: 'Sucesso ao recuperar os dados da API!'
                }
            });

        })
        .catch((err) => {
            this.setState({
                users: [],
                apiResult: {
                    status: 'error',
                    msg: 'Não foi possível recuperar os dados da api. Motivo: ' + err
                }
            })
            console.error('Não foi possível recuperar os dados da api. Motivo: ' + err);
            return;
        })
}

async function getUserInteractions(userID) {
    Api.get('/user/' + userID + '/interactions')
        .then(res => {
            let data = Util.castArray(res.data);
            this.setState({
                issues: data,
                apiResult: {
                    code: res.status,
                    status: 'success',
                    msg: 'Sucesso ao recuperar os dados da API!'
                }
            });
        })
        .catch((err) => {
            this.setState({
                issues: [],
                apiResult: {
                    code: err.status,
                    status: 'error',
                    msg: 'Não foi possível recuperar os dados da api. Motivo: ' + err
                }
            })
            console.error('Não foi possível recuperar os dados da api. Motivo: ' + err);
            return;
        });
}

export { getAllUsers, getUserInteractions }
