import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Content from './components/Content';
import Login from './components/screens/Login';
import { isAuthenticated } from './services/LoginService.js';
import './assets/sb-admin-2/css/sb-admin-2.css';
import './assets/css/style.css';

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
    if (this.state.isAuthenticaded) {

    }
    return (
      <div>

        <BrowserRouter>
          {this.state.isAuthenticaded ? (
            <div>
              <main>
                <div id="wrapper" className="sb-nav-fixed">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column container-fluid">
                      <Header handleLogout={this.handleAuthChange} />
                      <Content />
                    </div>
                </div>
              </main>

              <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid">
                  <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Your Website 2019</div>
                    <div>
                      <a href="#">Privacy Policy</a>
                      &middot;
                    <a href="#">Terms &amp; Conditions</a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>

          )
            : (
              <Login onLogin={this.handleAuthChange} />
            )}
        </BrowserRouter >

      </div>
    );
  }
}

export default App;
