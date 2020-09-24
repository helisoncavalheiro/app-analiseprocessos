import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Sidebar from './components/menu/Sidebar';
import Header from './components/Header';
import Content from './components/Content';
import './css/sb-admin/style.css';
import './css/style.css';
import Login from './components/screens/Login';
import { isAuthenticated } from './services/LoginService.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticaded: isAuthenticated()
    }

    this.handleAuthChange = this.handleAuthChange.bind(this);
  }

  handleAuthChange() {
    this.setState({
      isAuthenticaded: isAuthenticated()
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          {this.state.isAuthenticaded ? (

            <div id="wrapper" className="sb-nav-fixed">
              <Header />
              <div id="layoutSidenav">
                <Sidebar />
                <Content />
              </div>
            </div>

          )
            : (
              <div className="row">
                <div className="col-md-4 col-sm-12 offset-md-4">
                  <Login onLogin={this.handleAuthChange} />
                </div>
              </div>
            )}
        </BrowserRouter >
      </div>
    );
  }
}

export default App;
