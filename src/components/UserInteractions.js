import React from 'react';
import Table from './Table';
import { getUserInteractions, getAllUsers } from '../services/IssueService.js';
import AutocompleteDropdown from './AutocompleteDropdown.js';
import Input from './Input.js';
//import { Breadcrumb } from 'react-bootstrap';
import Breadcrumb from './Breadcrumb.js'
class UserInteractions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            issues: [],
            apiResult: {
                code: '',
                status: '',
                msg: ''
            },
            searchedId: '',
            users: []
        }

        this.getAllUsers = getAllUsers.bind(this);
        this.getUserInteractions = getUserInteractions.bind(this);
        this.constructUsersList = this.constructUsersList.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.fillNameById = this.fillNameById.bind(this);

    }

    componentDidMount() {
        this.getAllUsers();
    }

    fetchData(evt) {
        evt.preventDefault();
        let matricula = document.getElementById("matriculaInput");
        this.getUserInteractions(matricula.value);
    }

    constructTableData() {
        let tableData = [];
        this.state.issues.forEach(el => {
            tableData.push({
                id: el.id,
                createdOn: this.handleDateFormat(el.createdOn),
                tracker: el.trackerId.name,
                status: el.statusId.name
            });

        });

        return tableData;
    }

    constructUsersList(users) {
        let newUsers = [];
        //
        let testMatricula = /^[0-9]{6}$/;
        users.forEach(el => {
            if (testMatricula.test(el.login)) {
                let fullName = el.firstname.trim() + ' ' + el.lastname.trim();
                newUsers.push({ id: el.login, value: fullName });
            }
        });

        return newUsers;
    }

    handleDateFormat(stringDate) {
        const months = {
            '01': 'janeiro',
            '02': 'fevereiro',
            '03': 'março',
            '04': 'abril',
            '05': 'maio',
            '06': 'junho',
            '07': 'julho',
            '08': 'agosto',
            '09': 'setembro',
            '10': 'outubro',
            '11': 'novembro',
            '12': 'dezembro'
        }

        stringDate = stringDate.replace(/Z\[UTC\]$/, "");
        console.info("Ano: " + stringDate.substr(0, 4) + "\n" +
            "Mês: " + stringDate.substr(5, 2) + "\n" +
            "Dia: " + stringDate.substr(8, 2) + "\n" +
            "Hora: " + stringDate.substr(11, 2) + "\n" +
            "Minuto: " + stringDate.substr(14, 2) + "\n" +
            "Segundo: " + stringDate.substr(17, 2) + "\n" +
            "Milissegundo: " + stringDate.substring(20)
        );

        let ano = stringDate.substr(0, 4);
        let mes = stringDate.substr(5, 2);
        let dia = stringDate.substr(8, 2);
        let hora = stringDate.substr(11, 2);
        let minuto = stringDate.substr(14, 2);
        let segundo = stringDate.substr(17, 2);
        let milissegundo = stringDate.substring(20);
        let formatedDate = dia + "/" + mes + "/" + ano + "\n" + hora + ":" + minuto;
        return formatedDate;
    }

    fillNameById(id) {
        console.log(id);
        document.getElementById('matriculaInput').value = id;
    }



    render() {

        /*
        * Para permitir que seja exibida uma mensagem de erro no lugar da tabela
        * foi criada uma variável que recebe o JSX a ser renderizado
        */
        let htmlToRender;

        //Se a API retornar sucesso renderiza a tabela
        if (this.state.apiResult.status === "success") {
            let tableData = this.constructTableData();
            htmlToRender =
                <div className="row">
                    <div className="col-sm-12">
                        <Table state={tableData} tableTitle="Interações do usuário " />
                    </div>
                </div>;

        } else if (this.state.apiResult.status === "error") {
            //Se a API retornar um erro renderiza um alert exibindo os problemas encontrados
            htmlToRender =
                <div className="alert alert-danger" role="alert">
                    {this.state.apiResult.msg}
                </div>;
        }
        console.log(this.state.issues);
        let users = this.constructUsersList(this.state.users);
        return (
            <div>
                <h2 className="m-2">Interações do usuário</h2>
                <div className="card m-4">
                    <div className="card-body">
                        <Breadcrumb title="Filtros" />

                        <form onSubmit={this.fetchData} autoComplete="off">
                            <div className="row">
                                <div className="col-sm-12 col-md-3">
                                    <Input type="number" id="matriculaInput" />
                                </div>

                                <div className="col-sm-12 col-md-5">
                                    <AutocompleteDropdown label={"Nome do usuário"} listValues={users} onChange={this.fillNameById} />
                                </div>

                                <div className="col-sm-12 col-md-1 align-self-center">
                                    <button type="submit" className="btn btn-primary"><i className="fas fa-arrow-right" ></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {htmlToRender}
            </div >
        )
    }
}
export default UserInteractions;