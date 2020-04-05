import React from 'react';

class MenuHeading extends React.Component {
    render() {
        return (
            <div className="sb-sidenav-menu-heading">{this.props.text}</div>
        )
    }
}

export default MenuHeading;