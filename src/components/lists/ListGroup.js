import React from 'react';

export default class ListGroup extends React.Component{

    render(){
        return(
            <ul className="list-group">
                {this.props.children}
            </ul>
        )
    }
}