import React from 'react';
import ListGroup from './lists/ListGroup.js';
import ActionableItemGroup from './lists/ActionableItemGroup.js';
import { getServicos } from '../services/ServicoService.js';
import Loader from './Loader.js';

export default class Servico extends React.Component {

    constructor(props) {
        super(props);

        this.getServicos = getServicos.bind(this);

        this.state = {
            loading: false,
            servicos: [],
            apiResult: {
                code: '',
                msg: '',
            }
        }
    }

    componentDidMount() {
        this.fetchServicos();
    }

    fetchServicos() {
        this.setState({ loading: true });

        //let context = this;
        this.getServicos()
            .then(result => {
                if (result.code === 200) {
                    this.setState({
                        loading: false,
                        servicos: result.data,
                        apiResult: {
                            code: result.code,
                            msg: result.msg
                        }
                    });
                }
            }).catch(error => {
                this.setState({
                    loading: false,
                    apiResult: {
                        code: error.code,
                        msg: error.msg
                    }
                });
            })
    }

    render() {

        return (
            <div>
                <h2>Serviços</h2>
                <div className="row">
                    {this.state.loading
                        ? (
                            <div className="col-sm-12">
                                <Loader />
                            </div>
                        )
                        : (
                            <div className="col-sm-12">
                                <ListGroup>
                                    {this.state.servicos.map(el => {
                                        return (
                                            <ActionableItemGroup link={`/servico/${el.codigo}`} classes="">{el.servico}</ActionableItemGroup>
                                        )
                                    })}

                                </ListGroup>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}