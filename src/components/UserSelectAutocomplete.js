import React from 'react';
import AutocompleteDropdown from './AutocompleteDropdown';
import { getAllUsers } from '../services/UserService.js';

export default class UserAutoComplete extends React.Component {
    constructor(props) {
        super(props);

        this.getAllUsers = getAllUsers.bind(this);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    constructUsersList(users) {
        let newUsers = [];
        let testMatricula = /^[0-9]{6}$/;
        users.forEach(el => {
            if (testMatricula.test(el.login)) {
                let fullName = el.firstname.trim() + ' ' + el.lastname.trim();
                newUsers.push({ id: el.login, value: fullName });
            }
        });

        return newUsers;
    }

    render() {
        let users = this.constructUsersList(this.state.users);
        return (
            <AutocompleteDropdown label={"Nome do usuário"} listValues={users} onChange={this.props.onChange} />
        )
    }
}