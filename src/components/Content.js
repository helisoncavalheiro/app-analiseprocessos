import React from 'react';
import UserInteractions from './UserInteractions.js';
import UserCreations from './UserCreations.js';
import Servicos from './Servicos.js';

import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import Servico from './screens/Servico.js';

class Content extends React.Component {

    render() {
        return (
            <div id="layoutSidenav_content" >
                <main>
                    <div className="container-fluid">
                        <div className="container-fluid">
                            <Switch>
                                <Route path="/reports">
                                    <UserInteractions />
                                </Route>

                                <Route path="/user/creations">
                                    <UserCreations />
                                </Route>

                                <Route path="/servicos">
                                    <Servicos />
                                </Route>
                                
                                <Route path="/servico/:id" component={Servico}/>
                                
                            </Switch>
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
        );
    }
}

export default Content;