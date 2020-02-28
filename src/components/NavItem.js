import React from 'react';
import { Link, Router } from 'react-router-dom';
class NavItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <a className="nav-link collapsed" href="/home" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                <div className="sb-nav-link-icon">
                    <i className={"fas " + this.props.beforeIcon}></i>
                </div>
                {this.props.showName}
            </a>

        )
    }
}

export default NavItem;