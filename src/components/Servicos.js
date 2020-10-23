import React from 'react';
import ListGroup from './lists/ListGroup.js';
import ActionableItemGroup from './lists/ActionableItemGroup.js';
import { getServicos } from '../services/ServicoService.js';
import Loader from './Loader.js';
import { Table, Button, Card, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            },
            servicosFiltrados: []
        }

        this.handleSearch = this.handleSearch.bind(this);
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
                        },
                        servicosFiltrados: result.data
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

    handleSearch(evt) {

        //Pega o valor pesquisado e transforma todas as letras em minúsculo
        let searchedValue = evt.target.value.toLowerCase();

        //Filtra os elementos possíveis
        let valuesToDisplay = this.state.servicos.filter((el) => {
            //retorna todos os valores que foram achados
            if (searchedValue != "") {
                return (el.codigo == searchedValue) || (el.servico.toLowerCase().indexOf(searchedValue)) !== -1;
            } else {
                return true;
            }

        });

        //Muda o state com os valores que devem ser renderizados
        this.setState({
            servicosFiltrados: valuesToDisplay
        });
    }

    handleStatusServico(status) {
        switch (status) {
            case "true":
                return (<td className="text-success">Ativo</td>)
            case "false":
                return (<td className="text-danger">Inativo</td>)
            case "homologacao":
                return (<td className="text-secondary">Homologação</td>)
        }
    }

    render() {

        return (
            <Card className="mt-4">
                <Card.Header>
                    <div className="row">
                        <h2>Serviços</h2>
                        <div className="col-sm-3 float-right">
                            <Form>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Pesquise um nome ou id de serviço"
                                        aria-label="Pesquisa"
                                        aria-describedby="basic-addon2"
                                        onChange={this.handleSearch}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon2" className="bg-primary"><a><i class="fas fa-search"></i></a></InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </div>
                    </div>
                </Card.Header>
                <div className="row">
                    {this.state.loading
                        ? (
                            <div className="col-sm-12">
                                <Loader />
                            </div>
                        )
                        : (
                            <div className="col-sm-12">
                                <Table bordered responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Papeis</th>
                                            <th>Status</th>
                                            <th>Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.servicosFiltrados.map(el => {
                                            return (
                                                <tr>
                                                    <td className="align-middle">{el.codigo}</td>
                                                    <td className="align-middle">{el.servico}</td>
                                                    <td className="align-middle">
                                                        <div className="row">
                                                            {
                                                                el.solicitantes.map(papel => { 
                                                                    return (
                                                                        <div className="col-sm-6 mt-2">
                                                                            <Card className="bg-gray-400">
                                                                                <span style={{padding: '5px', color: '#353535'}}>{papel.id + ' - ' + papel.name}</span>
                                                                            </Card>
                                                                        </div>
                                                                    ) 
                                                                })
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>{this.handleStatusServico(el.status)}</td>
                                                    <td className="align-middle">
                                                        <Link to={`/servico/${el.codigo}`}>
                                                            <Button variant="primary">
                                                                <span style={{fontSize: '12px'}}>
                                                                    <i class="fas fa-eye"></i>
                                                                    Visualizar
                                                                </span>
                                                            </Button>
                                                        </Link>
                                                    </td>
                                                </tr>

                                            )
                                        })}
                                    </tbody>

                                </Table>

                            </div>
                        )
                    }
                </div>
            </Card>
        )
    }
}