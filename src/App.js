import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Sidebar from './components/menu/Sidebar';
import Header from './components/Header';
import Content from './components/Content';
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
    if (this.state.isAuthenticaded) {

    }
    return (
      <div>

        <BrowserRouter>
          {this.state.isAuthenticaded ? (
            <div>
              <main>
                <div id="wrapper" className="sb-nav-fixed">
                  <Header handleLogout={this.handleAuthChange} />
                  <div id="layoutSidenav">
                    <Sidebar />

                    <div id="layoutSidenav_content" >

                      <div className="container-fluid">
                        <div className="container-fluid">
                          <Content />
                        </div>
                      </div>

                    </div>
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
