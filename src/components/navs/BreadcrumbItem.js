import React from 'react';


export default class BreadCrumbItem extends React.Component {

    render() {

        let active = "";
        if(this.props.active){
            active = "active";
        }

        return (
            <li className={"breadcrumb-item " + active }>
                {this.props.children}
            </li>
        )
    }
}