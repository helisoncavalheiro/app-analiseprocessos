import React from 'react';
import { useHistory } from 'react-router-dom';

function Header({ userName = "" }){
  let history = useHistory();

  const logout = () => {
    sessionStorage.removeItem("token");
    history.push("/login");
  }

    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">

        <li className="nav-item dropdown no-arrow d-sm-none">
          <a className="nav-link dropdown-toggle" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-search fa-fw"></i>
          </a>

          <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <li className="nav-item dropdown no-arrow mx-1">
          <a className="nav-link dropdown-toggle" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-bell fa-fw"></i>
          </a>

          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
            <h6 className="dropdown-header">
              Alerts Center
            </h6>
            <a className="dropdown-item text-center small text-gray-500">Nenhum alerta</a>
          </div>
        </li>

        <li className="nav-item dropdown no-arrow mx-1">
          <a className="nav-link dropdown-toggle" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-envelope fa-fw"></i>
          </a>

          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
            <h6 className="dropdown-header">
              Message Center
            </h6>
            <a className="dropdown-item text-center small text-gray-500">Nenhuma mensagem</a>
          </div>
        </li>

        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userName}</span>
            <i className="fas fa-fw fa-user-circle fa-2x"></i>
          </a>

          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <a className="dropdown-item" >
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Perfil
            </a>
            <a className="dropdown-item" >
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Configurações
            </a>
            <a className="dropdown-item" >
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Histórico de atividades
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" data-toggle="modal" onClick={logout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Sair
            </a>
          </div>
        </li>

      </ul>

    </nav>
    )
}

export default Header;