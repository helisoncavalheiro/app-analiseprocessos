import React from 'react';
import { getAcoes } from '../../services/ServicoService.js';
import Loader from '../Loader.js';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default class Acoes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            acoes: [],
            apiResult: {
                code: '',
                msg: ''
            },
            filtros: {
                agrupamento: { ativo: false, por: '' },
                ordenacao: { ativo: false, por: '' }
            },
            acoesFiltradas: []
        }

        this.getAcoes = getAcoes.bind(this);
    }

    componentDidMount() {
        this.fetchAcoes();
    }

    fetchAcoes() {
        this.setState({ loading: true });
        getAcoes(this.props.idServico)
            .then(result => {
                this.setState({
                    loading: false,
                    acoes: result.data,
                    apiResult: {
                        code: result.code,
                        msg: result.msg
                    },
                    acoesFiltradas: this.groupByPapel(result.data)
                });
            })
            .catch(err => {
                console.log("Ocorreu um erro. Erro: " + err);
                this.setState({
                    loading: false,
                    apiResult: {
                        code: err.code,
                        msg: err.msg
                    }
                });
            });

    }

    groupByPapel(acoes) {
        let acoesFiltradas = []
        acoes.map(acao => {
            acao.disponivelPara.map(papel => {
                let elementoNoArray = acoesFiltradas.find(el => el.key == papel.id);

                console.log(elementoNoArray);

                console.log("O papel já foi mapeado no array: " + (elementoNoArray == undefined) ? "Não" : "Sim");
                if (elementoNoArray == undefined) {
                    acoesFiltradas.push({ key: papel.id, texto: papel.name, acoes: [acao] });
                } else {
                    console.log()
                    elementoNoArray.acoes.push(acao);
                }
            })
        })

        return acoesFiltradas;
    }

    render() {
        let acoes = this.state.acoes;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Card>
                        <Card.Header><h4>Ações</h4></Card.Header>
                        <Card.Body>
                            <div className="card-content">
                                {this.state.loading
                                    ? (
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <Loader />
                                            </div>
                                        </div >
                                    )
                                    : (
                                        <div className="row">
                                            {this.state.acoes.map(acao => {
                                                return (
                                                    <div className="col-sm-12 mt-4">
                                                        <Card border={(acao.ativo ? "primary" : "warning")}>
                                                            <Card.Header>
                                                                <div style={{ fontSize: '18px' }}>
                                                                    <span className="pr-2">Nome:</span>
                                                                    <span className="font-weight-bold">
                                                                        {acao.texto}
                                                                    </span>

                                                                </div>
                                                            </Card.Header>

                                                            <Card.Body>
                                                                <Card>
                                                                    <Card.Body>
                                                                        <span className="mb-2" style={{ margin: '0px 2px', fontSize: '18px' }}>Workflow: </span>
                                                                        <span className="bg-disabled" style={{ fontSize: '16px' }}>
                                                                            <span style={{ paddingRight: '5px' }}>
                                                                                {acao.origem.id + ' - ' + acao.origem.name}
                                                                            </span>
                                                                            <i className="fas fa-chevron-right" ></i>
                                                                            <span style={{ paddingLeft: '5px' }}>
                                                                                {acao.destino.id + ' - ' + acao.destino.name}
                                                                            </span>
                                                                        </span>


                                                                        {
                                                                            acao.atribuir ? (
                                                                                <span className="pl-2" style={{ fontSize: '20px' }}>
                                                                                    <Badge variant="primary">Atribuível para:
                                                                                            {acao.atribuiveis.map(papel => { return papel.id + ' - ' + papel.name })}</Badge>
                                                                                </span>
                                                                            )
                                                                                : ""
                                                                        }

                                                                    </Card.Body>
                                                                </Card>
                                                                <Card className="mt-2">
                                                                    <Card.Body>
                                                                        <span style={{ margin: '0px 2px', fontSize: '18px' }}>Papéis: </span>

                                                                        {
                                                                            acao.disponivelPara.map(papel => {
                                                                                return (
                                                                                    <span className="bg-disabled" style={{ fontSize: '16px' }}>
                                                                                        {papel.id + ' - ' + papel.name}
                                                                                    </span>)
                                                                            })}
                                                                    </Card.Body>
                                                                </Card>

                                                            </Card.Body>

                                                        </Card>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )

    }


}