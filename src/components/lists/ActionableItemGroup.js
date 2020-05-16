import React from 'react';

export default class ActionableItemGroup extends React.Component {

    render() {
        return (
            <a
                href={this.props.link}
                className="list-group-item list-group-item-action"
            >
                {this.props.children}
            </a>
        )
    }

}