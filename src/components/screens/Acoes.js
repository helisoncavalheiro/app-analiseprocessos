import React from 'react';
import { getAcoes } from '../../services/ServicoService.js';
import Loader from '../Loader.js';
import Card from 'react-bootstrap/Card';
import Acao from '../custom/Acao.js';
import Select from 'react-select';

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
                origens: [],
                destinos: [],
                papeis: [],
            },
            acoesFiltradas: [],
            origemFiltrada: [],
            destinoFiltrado: [],
            papelFiltrado: []
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
                    acoesFiltradas: result.data
                });
                this.populaFiltros();
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

    populaFiltros() {
        let novosFiltros = this.state.filtros;

        this.state.acoes.forEach(acao => {
            if (novosFiltros.origens.find(origem => origem.value == acao.origem.id) == null) {
                novosFiltros.origens.push({ value: acao.origem.id, label: acao.origem.name })
            }

            if (novosFiltros.destinos.find(destino => destino.value == acao.destino.id) == null) {
                novosFiltros.destinos.push({ value: acao.destino.id, label: acao.destino.name })
            }


            acao.disponivelPara.filter(papel => {
                if (novosFiltros.papeis.find(filtroPapel => filtroPapel.value == papel.id) == null) {
                    novosFiltros.papeis.push({ value: papel.id, label: papel.name })
                }
            });
        });

        this.setState({
            filtros: novosFiltros
        });
    }

    filtrarPorPapel(acoes, papeis) {
        let papeisIds = papeis.map(papel => { return papel.value });
        return acoes.filter(acao => {
            let disponivelPara = acao.disponivelPara.map(papel => { return papel.id });
            return disponivelPara.some(i => papeisIds.indexOf(i) >= 0);
        });
    }

    filtrarPorOrigem(acoes, origens) {
        return acoes.filter(acao => {
            return origens.find(origem => origem.value == acao.origem.id) != null;
        });
    }

    filtrarPorDestino(acoes, destinos) {
        return acoes.filter(acao => {
            return destinos.find(destino => destino.value == acao.destino.id) != null;
        });
    }

    handleFiltragem() {
        let acoesToShow = this.state.acoes;

        if (this.state.origemFiltrada.length > 0) {
            acoesToShow = this.filtrarPorOrigem(acoesToShow, this.state.origemFiltrada);
        }

        if (this.state.destinoFiltrado.length > 0) {
            acoesToShow = this.filtrarPorDestino(acoesToShow, this.state.destinoFiltrado);
        }

        if (this.state.papelFiltrado.length > 0) {
            acoesToShow = this.filtrarPorPapel(acoesToShow, this.state.papelFiltrado);
        }

        return acoesToShow;
    }

    render() {
        let acoes = this.state.acoesFiltradas;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Card>
                        <Card.Header>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Ações</h4>
                                    <hr class="solid"/>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-4">
                                    <p className="font-weight-bold">Situação de origem</p>
                                    <Select
                                        onChange={(values) => {
                                            this.setState({ origemFiltrada: (values != null) ? values : [] });
                                        }}
                                        id="filtro_origem"
                                        options={this.state.filtros.origens}
                                        isMulti
                                        placeholder="Situação de origem" />
                                </div>
                                <div className="col-sm-4">
                                    <p className="font-weight-bold">Situação de destino</p>
                                    <Select
                                        onChange={(values) => {
                                            this.setState({ destinoFiltrado: (values != null) ? values : [] });
                                        }}
                                        id="filtro_destino"
                                        options={this.state.filtros.destinos}
                                        isMulti
                                        placeholder="Situação de destino" />
                                </div>
                                <div className="col-sm-4">
                                    <p className="font-weight-bold">Disponível para</p>
                                    <Select onChange={(values) => {
                                        this.setState({ papelFiltrado: (values != null) ? values : [] });
                                    }}
                                        id="filtro_papel"
                                        options={this.state.filtros.papeis}
                                        isMulti
                                        placeholder="Disponível para" />
                                </div>
                            </div>
                        </Card.Header>
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
                                            {this.handleFiltragem().map(acao => {
                                                return <Acao data={acao} />
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