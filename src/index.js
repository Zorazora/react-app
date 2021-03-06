import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RouterConfig from "./router/index";
import md5 from "js-md5";
import {Provider} from 'react-redux';
import store from './store/index'

React.Component.prototype.$md5 = md5;

ReactDOM.render(
    <Provider store={store}>
        <RouterConfig/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
