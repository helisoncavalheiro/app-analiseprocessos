import React from 'react';

class NavCollapse extends React.Component {
    render() {
        return (
            <div>
                <a href={this.props.route} className="nav-link collapsed"
                    data-toggle="collapse" data-target={"#collapse-" + this.props.id}
                    aria-expanded="false" aria-controls={"collapse-" + this.props.id}
                >

                    <div className="sb-nav-link-icon"><i className={"fas fa-" + this.props.icon}></i></div>
                    {this.props.text}
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id={"collapse-" + this.props.id} >
                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                        {this.props.children}
                    </nav>
                </div>
            </div>
        )
    }
}

export default NavCollapse;