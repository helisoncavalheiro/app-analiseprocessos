import React from 'react';
import Breacrumb from '../navs/Breadcrumb';
import BreadCrumbItem from '../navs/BreadcrumbItem';
import { getServico } from '../../services/ServicoService.js';
import Loader from '../Loader';
import Collapsible from '../lists/Collapsible';

export default class Servico extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            servico: {},
            apiResult: {
                code: '',
                msg: ''
            }
        }

        this.getServico = getServico.bind(this);
        this.extrairNomeDoServico = this.extrairNomeDoServico.bind(this);
    }

    componentDidMount() {
        this.fetchServico();
    }

    fetchServico() {
        this.setState({ loading: true });
        getServico(this.props.match.params.id)
            .then(result => {
                console.log()
                this.setState({
                    loading: false,
                    servico: result.data,
                    apiResult: {
                        code: result.code,
                        msg: result.msg
                    }
                })
            })
            .catch(err => {
                console.log("Ocorreu um erro. Erro: " + err);
                this.setState({
                    loading: false,
                    apiResult: {
                        code: err.code,
                        msg: err.msg
                    }
                })
            })

    }

    extrairNomeDoServico(servico) {
        let categorias = servico.split('>');

        return categorias[categorias.length - 1].trim();
    }

    extrairCategorias(servico) {
        let categorias = servico.split('>');

        return categorias.filter((categoria, index, array) => {
            return index !== array.length - 1
        });
    }

    render() {
        let servico = this.state.servico;

        let servicoStatus = { class: '', text: '' };

        switch (servico.status) {
            case 'false':
                servicoStatus = {
                    class: 'danger',
                    text: 'Inativo'
                }
                break;
            case 'homologacao':
                servicoStatus = {
                    class: 'secondary',
                    text: 'Homologação'
                }
                break;
            case 'true':
                servicoStatus = {
                    class: 'success',
                    text: 'Ativo'
                }
                break;
            default:
                servicoStatus = {
                    class: 'secondary',
                    text: 'Indefinido'
                }
                break;
        }

        return (
            <div>
                {this.state.loading
                    ? (
                        <div className="row">

                            <div className="col-sm-4 offset-sm-4">
                                <Loader />
                            </div>
                        </div >

                    )
                    : (
                        <div>
                            <div className="row ">
                                <div className="col-sm-12">
                                    <Breacrumb>
                                        <BreadCrumbItem active={true}><a href="/servicos">Serviços</a></BreadCrumbItem>
                                        {this.extrairCategorias(servico.servico).map(categoria => {
                                            return <BreadCrumbItem>{categoria}</BreadCrumbItem>
                                        })}
                                        <BreadCrumbItem>{this.extrairNomeDoServico(this.state.servico.servico)}</BreadCrumbItem>
                                    </Breacrumb >
                                </div >
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col-sm-12">
                                                    <span className={"badge badge-" + servicoStatus.class}>{servicoStatus.text}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-sm-9 vertical-divider" >
                                                    <span className="font-weight-bold">Serviço: </span>
                                                    <span className="card-title">{this.extrairNomeDoServico(servico.servico)}</span>
                                                </div>
                                                <div className="col-sm-3">
                                                    <span className="font-weight-bold">ID: </span>
                                                    <span>{servico.codigo}</span>
                                                </div>
                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-sm-12">
                                                    <div className="accordion">
                                                        <div className="card bg-disabled border-0">
                                                            <div className="card-body">
                                                                <span className="font-weight-bold card-title" 
                                                                        data-toggle="collapse" 
                                                                        data-target="#descricaoDiv" 
                                                                        aria-expanded="true" 
                                                                        aria-controls="descricaoDiv"
                                                                >
                                                                    <i class="fas fa-chevron-circle-right"></i> 
                                                                    Descrição
                                                                </span>
                                                                <div id="descricaoDiv" className="collapse">
                                                                    <div className="card-text">
                                                                        {servico.descricao !== "" ? servico.descricao : "Sem descrição"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

}