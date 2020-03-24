import React from 'react';
import Chart from 'chart.js';
import Select from '../formComponents/Select';
import Breacrumb from '../Breadcrumb';

export default class Bar extends React.Component {
    constructor(props) {
        super(props);

        this.handleChartTypeChange = this.handleChartTypeChange.bind(this);
    }

    componentDidMount(){
        let canvasElement = document.getElementById("chartWrapper");
        let chart = new Chart(canvasElement, this.makeChartStructure());
        this.setState({ chart: chart });
    }

    componentDidUpdate(){
        this.state.chart.config = this.makeChartStructure();
        this.state.chart.update();
    }

    makeChartStructure(){

        let chartOptions = this.props.options;

        let chart = {
            type: chartOptions.type,
            data:{
                labels: chartOptions.labels,
                datasets: chartOptions.datasets
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },

                    }]
                }
            }
        }

        return chart;
    }

    handleChartTypeChange(evt) {
        this.state.chart.config.type = evt.target.value;
        this.state.chart.update();
    }

    render() {
        let chartTypes = [
            {
                key: 'bar',
                value: 'Barras'
            },
            {
                key: 'pie',
                value: 'Pizza'
            }
        ]

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="card col-sm-12">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Breacrumb title="Opções do gráfico" />
                                    </div>
                                    <div className="col-sm-3">
                                        <Select id="chartType" label="Tipo de gráfico" options={chartTypes} onChange={this.handleChartTypeChange} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <canvas id="chartWrapper" className="col-sm-12"></canvas>
                    </div>

                </div>
            </div>
        )
    }
}