import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import './index.scss';
import { store } from './redux-store/store.js';
import Wrapper from './components/Wrapper';

//ws://10.217.153.98:8082/
//wss://echo.websocket.org/
const ws = new WebSocket('wss://echo.websocket.org/');
ws.onopen = () => console.log('Opened');
ws.onclose = () => console.log('Closed');
ws.onerror = e => console.log(e.data);

const Connecter = () => {
    return(
        <Wrapper ws={ws} />
    )
}

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <Connecter />
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);