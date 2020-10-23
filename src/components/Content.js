import React from 'react';
import UserInteractions from './UserInteractions.js';
import UserCreations from './UserCreations.js';
import Servicos from './Servicos.js';
import NotFound from './NotFound.js';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Servico from './screens/Servico.js';
import { isAuthenticated } from '../services/LoginService.js';
import Sidebar from './Sidebar.js';
import Header from './Header.js';
import Util from '../utils/Util.js';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)



const Content = () => {
    //let {path} = useRouteMatch();
    return (
        <div>
            <main>
                <div id="wrapper" className="sb-nav-fixed">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column container-fluid">
                        {
                            isAuthenticated() 
                            ? (<Header userName={Util.decodeJWT().full_name}/>)
                            : (<Header />)
                        
                        }
                        
                        <div id="content">
                            <Switch>
                                <PrivateRoute exact path="/" component={()=>(<div></div>)} />

                                <PrivateRoute exact path={`/user/interacoes`} component={UserInteractions} />
                            
                                <PrivateRoute exact path={`/user/solicitacoes`} component={UserCreations}/ >
                            
                                <PrivateRoute exact path={`/servicos`} component={Servicos}/>
                            
                                <PrivateRoute exact path={`/servico/:id`} component={Servico} />
                            
                                <PrivateRoute exact path={`/404`} component={NotFound}/>
                            </Switch>
                        </div >
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
}
    
export default Content;