import App from '../pages/App';
import Login from '../pages/login/Login';
import Register from '../pages/login/Register';
import Activate from '../pages/login/Activate';
import MainLayout from '../component/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import UploadProject from '../pages/analysis/UploadProject'
import UserCenter from '../pages/usercenter/UserCenter'
import History from '../pages/history/History'
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
                    <Route exact path='/arcan/usercenter' component={UserCenter}/>
                    <Route exact path='/arcan/history/:repoId' component={History}/>
                </MainLayout>
            }/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/activate/:id' component={Activate}/>
        </Switch>
    </Router>
)

export default RouterConfig