import React from 'react';
import Table from './Table';
import { getUserInteractions, getAllUsers } from '../services/UserService.js';
import AutocompleteDropdown from './AutocompleteDropdown.js';
import Input from './Input.js';
//import { Breadcrumb } from 'react-bootstrap';
import Breadcrumb from './navs/Breadcrumb.js'
import Bar from './charts/Chart.js';
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
            users: [],
            chart: {}
        }

        this.getAllUsers = getAllUsers.bind(this);
        this.getUserInteractions = getUserInteractions.bind(this);
        this.constructUsersList = this.constructUsersList.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.fillIdByName = this.fillIdByName.bind(this);
        this.constructChart = this.constructChart.bind(this);

        this.inputElement = React.createRef();

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

        stringDate = stringDate.replace(/Z\[UTC\]$/, "");

        let ano = stringDate.substr(0, 4);
        let mes = stringDate.substr(5, 2);
        let dia = stringDate.substr(8, 2);
        let hora = stringDate.substr(11, 2);
        let minuto = stringDate.substr(14, 2);
        //let segundo = stringDate.substr(17, 2);
        //let milissegundo = stringDate.substring(20);
        let formatedDate = dia + "/" + mes + "/" + ano + "\n" + hora + ":" + minuto;
        return formatedDate;
    }

    fillIdByName(id) {
        this.inputElement.current.handleChange(id);
    }

    constructChart() {

        let chartData = [{label: '', value: '' }];
        let trackerControl = [];

        this.state.issues.forEach(el => {
            if (!trackerControl.includes(el.trackerId.name)) {
                let currentTrackerName = el.trackerId.name;
                let counter = 0;
                this.state.issues.forEach((el) => {
                    if (el.trackerId.name === currentTrackerName){
                        counter++;
                    }
                });
                chartData.push({label: currentTrackerName, value: counter});
                trackerControl.push(currentTrackerName);
            }
        });
        chartData.shift();

        chartData.sort((a, b)=>{
            const valueA = a.value;
            const valueB = b.value;

            let comparison = 0;
            if(valueA > valueB){
                comparison = -1;
            }else if(valueA < valueB){
                comparison = 1;
            }
            return comparison;
        });

        let labels = []
        let values = []

        chartData.forEach((el, index)=>{
            labels.push(chartData[index].label);
            values.push(el.value);
        });

        let chartStructure = {
            type: 'bar',
            labels: labels,
            datasets: [{
                label: 'Interações do usuário',
                data: values,
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        }

        chartData.forEach(el=>{
            let r = Math.floor(Math.random() * (255 - 0)) + 0;
            let g = Math.floor(Math.random() * (255 - 0)) + 0;
            let b = Math.floor(Math.random() * (255 - 0)) + 0;
            chartStructure.datasets[0].backgroundColor.push(`rgba(${r} , ${g}, ${b}, 0.5)`);
            chartStructure.datasets[0].borderColor.push(`rgba(${r} , ${g}, ${b}, 1)`);
        });

        return chartStructure;
    }


    render() {

        /*
        * Para permitir que seja exibida uma mensagem de erro no lugar da tabela
        * foi criada uma variável que recebe o JSX a ser renderizado
        */
        let htmlToRender;

        //Se a API retornar sucesso renderiza a tabela
        if (this.state.issues.length > 0) {
            let tableData = this.constructTableData();
            let chart = this.constructChart();
            htmlToRender =
                <div className="row">
                    <div className="col-sm-12">
                        <Bar options={chart} />
                    </div>
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
                                    <Input type="number" id="matriculaInput" label="Matrícula do usuário" ref={this.inputElement}/>
                                </div>

                                <div className="col-sm-12 col-md-5">
                                    <AutocompleteDropdown label={"Nome do usuário"} listValues={users} onChange={this.fillIdByName} />
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