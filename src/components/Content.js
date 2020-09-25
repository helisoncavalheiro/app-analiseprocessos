import React from 'react';
import UserInteractions from './UserInteractions.js';
import UserCreations from './UserCreations.js';
import Servicos from './Servicos.js';
import '../css/sb-admin/style.css';
import '../css/style.css';

import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import Servico from './screens/Servico.js';

class Content extends React.Component {

    render() {
        return (
            <div id="content">
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

                    <Route path="/servico/:id" component={Servico} />

                </Switch>
            </div >
        );
    }
}

export default Content;