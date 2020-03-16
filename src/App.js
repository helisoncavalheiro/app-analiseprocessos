import React from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Content from './components/Content';
import './css/style.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { }
  }
  render() {
    return (
      <div id="wrapper" className="sb-nav-fixed">
        <Header />
        <div id="layoutSidenav">
          <Sidebar />
          <div></div>
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
