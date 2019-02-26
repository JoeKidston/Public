import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import LoginComponent from './components/LoginComponent'; 
import App from './App'; 
import RegistrationComponent from './components/RegistrationComponent'; 
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'; 

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/api/login" component={LoginComponent} />
            <Route exact path="/" component={App} />
            <Route exact path="/api/register" component={RegistrationComponent} />
        </div>
    </BrowserRouter>, 
    document.getElementById('root'));

serviceWorker.unregister();