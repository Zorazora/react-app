import App from '../pages/App';
import Login from '../pages/login/Login';
import Register from '../pages/login/Register';
import Activate from '../pages/login/Activate';
import MainLayout from '../component/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import UploadProject from '../pages/analysis/UploadProject'
import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const RouterConfig = () => (
    <Router>
        <Switch>
            <Route path='/' exact render={()=>(
                <Redirect to='/arcan'/>
            )}/>
            <Route path='/arcan' render={()=>
                <MainLayout>
                    <Route exact path='/arcan' component={App}/>
                    <Route exact path='/arcan/repository/:repoId' component={UploadProject}/>
                    <Route exact path='/arcan/register' component={Register}/>
                    <Route exact path='/arcan/dashboard/:userId' component={Dashboard}/>
                </MainLayout>
            }/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/activate/:id' component={Activate}/>
        </Switch>
    </Router>
)

export default RouterConfig