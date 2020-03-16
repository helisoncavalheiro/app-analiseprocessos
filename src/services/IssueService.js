import api from '../utils/api.js';

/*
Função para garantir que os itens serão sempre
retornados como array
*/
function castArray(arrayToCast) {
    //console.log(arrayToCast);
    if (Array.isArray(arrayToCast)) {
        return arrayToCast;
    } else {
        return [arrayToCast];
    }
}

export async function getUserInteractions(matriucla) {
    api.get('/user/' + matriucla + '/interactions')
        .then(res => {
            let data = castArray(res.data);
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

export async function getAllUsers() {
    api.get('/user/list')
        .then(res => {
            let data = castArray(res.data);
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
