import React from 'react';

class Table extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tableHeaders: ['ID', 'Data de criação', 'Tipo', 'Status'],
            tableData: {}
        }
    }

/***Função que constroi o cabeçalho da tabela***/
    setTableHeaders(tableHeader) {
        let formattedHeader = [];
        let counter = 0;
        tableHeader.forEach((title) => {
            formattedHeader.push(<th key={counter += 1}>{title}</th>)
        })
        return formattedHeader;
    }


/***Função que constroi as linhas da tabela***/
    setTableRows(arrayOfObjects) {

        let rows = [];
        let key = 1;
        arrayOfObjects.forEach(object => {

            /*
            *Transforma o objeto em um vetor com os valores
            *de cada atributo do objeto
            */
            let data = Object.values(object);
            let cells = [];
             
            data.forEach((item, index) => {
                /*
                *Adiciona cada valor do atributo em um vetor
                *contendo as células da linha
                */
                cells.push(<td key={index}>{item}</td>)
            })

            //Adiciona a linha gerada ao vetor de linhas
            rows.push(
                <tr key={key}>{cells}</tr>
            );
            key++
        })
        return rows;
    }
    render() {
        //Adiciona o cabeçalho gerado à uma variavel
        let tableHeader = this.setTableHeaders(this.state.tableHeaders);
        //Adiciona as linhas geradas à uma variável
        let tableRows = this.setTableRows(this.props.state);
        return (
            <div className="card">
                <div className="card-header"><i className="fas fa-table mr-1"></i>{this.props.tableTitle}</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    {tableHeader}
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default Table;