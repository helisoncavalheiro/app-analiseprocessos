import React from 'react';

class NavItem extends React.Component {
    render() {
        let icon = "";
        if (this.props.icon !== undefined) {
            icon = <div className="sb-nav-link-icon">
                <i className={"fas fa-" + this.props.icon}></i>
            </div>;
        }

        return (
            <a className="nav-link" href={this.props.route}>
                {icon}
                {this.props.text}
            </a>
        )
    }
}

export default NavItem;