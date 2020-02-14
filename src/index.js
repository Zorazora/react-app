import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import RouterConfig from './router/index'
import * as serviceWorker from './serviceWorker';
import RouterConfig from "./router/index";

console.log(document.getElementById('root'))
ReactDOM.render(<RouterConfig/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();