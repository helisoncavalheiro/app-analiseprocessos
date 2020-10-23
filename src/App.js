import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Content from './components/Content';
import Login from './components/screens/Login';
import { isAuthenticated } from './services/LoginService.js';
import './assets/sb-admin-2/css/sb-admin-2.css';
import './assets/css/style.css';

const App = ()=>{

	let [authenticated, setAuthenticated] = useState(isAuthenticated());

	let handleLogin = ()=>{
		setAuthenticated(isAuthenticated());
	}

	return (
		<div>
			<BrowserRouter>
				{authenticated ? (<Redirect to={{pathname: '/'}}/>) : (<Redirect to={{pathname: '/login'}}/>)}
				
				<Switch>
					<Route exact path="/login" render={()=>(<Login onLogin={() => {handleLogin()}} />)}/>
					<Route path ="/">
						<Content/>
					</Route>
				</Switch>
				
			</BrowserRouter >

		</div>
	)
}

export default App;
