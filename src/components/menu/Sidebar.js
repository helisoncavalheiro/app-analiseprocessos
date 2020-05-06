import React from 'react';
import NavItem from './NavItem';
import $ from 'jquery';
import MenuHeading from './MenuHeading';
import NavCollapse from './NavCollapse';

class Sidebar extends React.Component {
    componentDidMount() {
        // Toggle the side navigation
        $("#sidebarToggle").on("click", function (e) {
            e.preventDefault();
            $("body").toggleClass("sb-sidenav-toggled");
        });

        // Add active state to sidbar nav links
        var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function () {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });
    }
    render() {
        return (
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <MenuHeading text="Início" />
                            <NavItem text='Meu Dashboard' icon='tachometer-alt' route="/home" />

                            <MenuHeading text="Relatórios" />

                            <NavCollapse id="user" text="Usuário" icon="user">
                                <NavItem text="Interações" icon='user-plus' route="/reports" />
                            </NavCollapse>
                            <NavItem text="Solicitações" icon='user-plus' route="/user/creations"/>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        
                    </div>
                </nav>
            </div>
        );
    }
}

export default Sidebar;