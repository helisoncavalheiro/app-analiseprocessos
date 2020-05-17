import React from 'react';
import Breadcrumb from './navs/Breadcrumb';
import UserSelectAutocomplete from './UserSelectAutocomplete.js';
import { getUserCreations } from '../services/IssueService.js';
import Table from './Table';
import Util from '../utils/Util.js';
import Loader from './Loader.js';
import Chart from './charts/Chart.js';
import BreadcrumbItem from './navs/BreadcrumbItem';

class UserCreation extends React.Component {

    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.getUserCreations = getUserCreations.bind(this);
        this.showLoader = Util.showLoader;
        this.handleDateFormat = Util.handleDateFormat;
        this.constructTableData = Util.constructTableData;
        this.setSelectedUserId = this.setSelectedUserId.bind(this);

        this.state = {
            loading: false,
            issues: [],
            userID: '',
            apiResult: {
                code: '',
                msg: ''
            },
            chart: {}
        }
    }

    fetchData(evt) {

        evt.preventDefault();
        this.setState({ loading: true });

        let userID = this.state.userID;
        console.log(this.state.userID);

        //Atribui o this para uma variável acessível dentro do callback da API
        let ctx = this;
        this.getUserCreations(userID)
            .then(function (result) {
                if (result.code === 200) {
                    ctx.setState({
                        loading: false,
                        issues: result.data,
                        apiResult: {
                            code: result.code,
                            msg: result.msg
                        }
                    });
                }
            })
            .catch(function (err) {
                console.error("Erro ao processar as informações retornadas pela API. Erro: " + err);
            })
    }

    constructChart() {

        let chartData = [{ label: '', value: '' }];
        let trackerControl = [];

        this.state.issues.forEach(el => {
            if (!trackerControl.includes(el.trackerId.name)) {
                let currentTrackerName = el.trackerId.name;
                let counter = 0;
                this.state.issues.forEach((el) => {
                    if (el.trackerId.name === currentTrackerName) {
                        counter++;
                    }
                });
                chartData.push({ label: currentTrackerName, value: counter });
                trackerControl.push(currentTrackerName);
            }
        });
        chartData.shift();

        chartData.sort((a, b) => {
            const valueA = a.value;
            const valueB = b.value;

            let comparison = 0;
            if (valueA > valueB) {
                comparison = -1;
            } else if (valueA < valueB) {
                comparison = 1;
            }
            return comparison;
        });

        let labels = []
        let values = []

        chartData.forEach((el, index) => {
            labels.push(chartData[index].label);
            values.push(el.value);
        });

        let chartStructure = {
            type: 'bar',
            labels: labels,
            datasets: [{
                label: 'Solicitações do usuário',
                data: values,
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        }

        chartData.forEach(el => {
            let r = Math.floor(Math.random() * (255 - 0)) + 0;
            let g = Math.floor(Math.random() * (255 - 0)) + 0;
            let b = Math.floor(Math.random() * (255 - 0)) + 0;
            chartStructure.datasets[0].backgroundColor.push(`rgba(${r} , ${g}, ${b}, 0.5)`);
            chartStructure.datasets[0].borderColor.push(`rgba(${r} , ${g}, ${b}, 1)`);
        });

        return chartStructure;
    }

    setSelectedUserId(id) {
        this.setState({ userID: id });
    }

    render() {

        let dataToShow;

        if (this.state.apiResult.code === 200) {
            let tableData = this.constructTableData();
            let chart = this.constructChart();
            dataToShow =
                <div className="row">
                    <div className="col-sm-12">
                        <Chart options={chart}/>
                    </div>
                    <div className="col-sm-12">
                        <Table state={tableData} tableTitle="Solicitações do usuário" />
                    </div>
                </div>;
        } else if (this.state.apiResult.code !== '') {
            //Se a API retornar um erro renderiza um alert exibindo os problemas encontrados
            dataToShow =
                <div className="alert alert-danger" role="alert">
                    {this.state.apiResult.msg}
                </div>;
        }

        return (

            <div>
                <h2 className="m-2">Solicitações do usário</h2>
                <div className="card m-4">
                    <div className="card-body">
                        <Breadcrumb>
                            <BreadcrumbItem active={true}>Filtros</BreadcrumbItem>
                        </Breadcrumb>

                        <form onSubmit={this.fetchData} autoComplete="off">
                            <div className="row">
                                <div className="col-sm-12 col-md-10">
                                    <UserSelectAutocomplete onChange={this.setSelectedUserId} />
                                </div>
                                <div className="col-sm-12 col-md-1 align-self-center">
                                    <button type="submit" className="btn btn-primary"><i className="fas fa-arrow-right" ></i></button>
                                </div>
                                {!this.state.loading ? null : (
                                    <div className="col-sm-12 col-md-1">
                                        <Loader />
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                {dataToShow}
            </div >

        )
    }

}

export default UserCreation;