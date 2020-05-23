import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/menu/Sidebar';
import Header from './components/Header';
import Content from './components/Content';
import './css/sb-admin/style.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <div id="wrapper" className="sb-nav-fixed">
          <Header />
          <div id="layoutSidenav">
            <Sidebar />
            <Content />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
