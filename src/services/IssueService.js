import Api from '../utils/api.js';
import Util from '../utils/Util.js';


async function getUserCreations(userID) {
    Api.get(`/issue/author/${userID}`)
        .then(res => {
            let data = Util.castArray(res.data);
            return {
                code: res.status,
                status: 'success',
                msg: 'Sucesso ao recuperar os dados da API!',
                data: data,
            }
        })
        .catch ((err) => {
    return {
        apiResult: {
            code: err.response.status,
            msg: 'Houve um erro ao recuperar os dados da API.'
        }
    }
})
}

export { getUserCreations };


