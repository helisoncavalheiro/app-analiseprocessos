import React from 'react';

class AutocompleteDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedValues: this.props.listValues
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleElementSelection = this.handleElementSelection.bind(this);
        this.getInitialValues = this.getInitialValues.bind(this);

    }

    handleSearch(evt) {

        //Pega o valor pesquisado e transforma todas as letras em minúsculo
        let searchedValue = evt.target.value.toLowerCase();

        //Filtra os elementos possíveis
        let valuesToDisplay = this.props.listValues.filter((el) => {
            //Pega o valor do elemento atual e transforma as letras em minúsculo
            let currentValue = el.value.toLowerCase();
            //retorna todos os valores que foram achados
            return currentValue.indexOf(searchedValue) !== -1;
        });

        //Muda o state com os valores que devem ser renderizados
        this.setState({
            displayedValues: valuesToDisplay
        });

        
    }

    getInitialValues(evt) {
        if (evt.target.value === "") {
            this.setState({ displayedValues: this.props.listValues });
        } else {
            return;
        }
    }

    handleElementSelection(evt) {
        //Adiciona o nome selecionado ao input
        document.getElementById("dropdownMenuInput").value = evt.target.getAttribute("data-value");

        this.props.onChange(evt.target.getAttribute("data-id"));
    }

    render() {
        let menuStyle = {
            minWidth: '100%',
            maxHeight: '300px',
            overflow: 'auto',
            //position: 'relative',
            //top: '0px',

        }
        return (
            <div className="form-group">
                <div className="dropdown">
                    <label>{this.props.label}</label>
                    <input className="form-control" onClick={this.getInitialValues} onChange={this.handleSearch} type="text" id="dropdownMenuInput" data-toggle="dropdown" aria-haspopup="true" />
                    <div id="dropdownList" className="dropdown-menu" style={menuStyle} data-boundary="window" data-offset="10">
                        {
                        //Renderiza os valores filtrados
                        this.state.displayedValues.map((el) => {
                                return (
                            <a key={el.id} onClick={this.handleElementSelection} className="dropdown-item" data-value={el.value} data-id={el.id}>
                                <span className="badge badge-secondary" style={{ marginRight: '10px' }}>{el.id}</span>
                                {el.value}
                                <div className="dropdown-divider"></div>
                            </a>
                            )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default AutocompleteDropdown;