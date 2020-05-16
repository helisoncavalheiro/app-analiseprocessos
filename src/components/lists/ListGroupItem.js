import React from 'react';

export default class ListGroupItem extends React.Component {

    render() {
        return (
            <li className="list-group-item">{this.props.innerText}</li>
        )
    }

}