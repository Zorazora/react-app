import App from '../pages/App';
import Main from '../pages/Main';
import MainLayout from '../component/MainLayout'
import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

const RouterConfig = () => (
    <HashRouter>
        <Switch>
            <Route path='/' exact render={()=>(
                <Redirect to='/home'/>
            )}/>
            <Route path='/' render={()=>
                <MainLayout>
                    <Route exact path='/home' component={App}/>
                    <Route exact path='/main' component={Main}/>
                </MainLayout>
            }/>
        </Switch>
    </HashRouter>
)

export default RouterConfig