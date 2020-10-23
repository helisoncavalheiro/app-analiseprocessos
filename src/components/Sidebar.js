import React, { useEffect } from 'react';
import $ from 'jquery';
import { Nav } from 'react-bootstrap';
import { BrowserRouter, Link, Router, useHistory } from 'react-router-dom';

function Sidebar(){
  
 useEffect(()=>{
    $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
    });
  })
  
    return (
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/home">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Process Monitor ADO</div>
          </a>
          
          <hr className="sidebar-divider my-0"/>
          
          <Nav.Item as="li">
            <Link className="nav-link" to="/home">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboards</span>
            </Link>
          </Nav.Item>        
          
          <hr className="sidebar-divider"/>
          
          <div className="sidebar-heading">
          Relatórios rápidos
          </div>

          <Nav.Item as="li">
            <Nav.Link className="collapsed" href="#" data-toggle="collapse" data-target="#collapseUsuarios" aria-expanded="true" aria-controls="collapseUsuarios">
              <i className="fas fa-fw fa-users"></i>
              <span>Relatório de Usuários</span>
            </Nav.Link>
            <div id="collapseUsuarios" className="collapse" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/user/interacoes"><i className="fas fa-fw fa-mouse"></i>Interações</Link>
              <Link className="collapse-item" to="/user/solicitacoes"><i className="fas fa-fw fa-user-plus"></i>Solicitações</Link>
            </div>
          </div>
          </Nav.Item>

          <Nav.Item as="li">
            <Link className="nav-link" to="/servicos">
              <i className="fas fa-fw fa-cubes"></i>
              <span>Serviços</span>
            </Link>
          </Nav.Item>
                  
          <hr className="sidebar-divider d-none d-md-block"/>
          
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle">

            </button>
            
          </div>
        
      </ul>
      )
}
  
export default Sidebar;