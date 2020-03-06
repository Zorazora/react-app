import App from '../pages/App';
import Main from '../pages/Main';
import Login from '../pages/login/Login';
import Register from '../pages/login/Register';
import Activate from '../pages/login/Activate';
import MainLayout from '../component/MainLayout';
import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

const RouterConfig = () => (
    <HashRouter>
        <Switch>
            <Route path='/' exact render={()=>(
                <Redirect to='/arcan'/>
            )}/>
            <Route path='/arcan' render={()=>
                <MainLayout>
                    <Route exact path='/arcan' component={App}/>
                    <Route exact path='/arcan/main' component={Main}/>
                    <Route exact path='/arcan/register' component={Register}/>
                </MainLayout>
            }/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/activate/:id' component={Activate}/>
        </Switch>
    </HashRouter>
)

export default RouterConfig