import React from 'react';
import Breadcrumb from './Breadcrumb';
import Input from './Input';
import AutocompleteDropdown from './AutocompleteDropdown';
import { getUserCreations } from '../services/IssueService.js';

class UserCreation extends React.Component {

    constructor(props){
        super(props);

        this.getUserCreations = getUserCreations.bind(this);
    }

    fetchData(evt){
        evt.preventDefault();
        let userID = document.getElementById("matriculaInput").nodeValue;
        let result = this.getUserCreations(userID);
        if(result.code === 200){
            this.setState({
                issues: result.data
            });
        }
    }

    render() {
        /*
        if(this.state.issues !== undefined){
            let htmlToRender = 
        }
        */
        return (
            <div>
                <h2 className="m-2">Solicitações do usário</h2>
                <div className="card m-4">
                    <div className="card-body">
                        <Breadcrumb title="Filtros" />

                        <form onSubmit={this.fetchData} autoComplete="off">
                            <div className="row">
                                <div className="col-sm-12 col-md-3">
                                    <Input type="number" id="matriculaInput" label="Matrícula do usuário" ref={this.inputElement} />
                                </div>

                                <div className="col-sm-12 col-md-5">
                                    {//<AutocompleteDropdown label={"Nome do usuário"} listValues={users} onChange={this.fillIdByName} />
                                    }
                                </div>

                                <div className="col-sm-12 col-md-1 align-self-center">
                                    <button type="submit" className="btn btn-primary"><i className="fas fa-arrow-right" ></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserCreation;