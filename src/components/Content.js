import React from 'react';
import UserInteractions from './UserInteractions.js';
import UserCreations from './UserCreations.js';
import Servicos from './Servicos.js';

import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import Servico from './screens/Servico.js';

class Content extends React.Component {

    render() {
        return (
            <div id="content">
                <Switch>
                    <Route path="/user/interacoes">
                        <UserInteractions />
                    </Route>

                    <Route path="/user/solicitacoes">
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