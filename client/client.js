/*eslint-env browser*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { getRoutes } from 'routes';
import Store from 'store';
import { CookiesProvider, Cookies } from '../client/warehouse';

const store = Store(window.REDUX_INITIAL_STATE || {});
const history = syncHistoryWithStore(browserHistory, store);
const cookies = new Cookies(document);

const app = (
    <Provider store={store}>
        <CookiesProvider cookies={cookies}>
            <Router history={history}>
                {getRoutes(store)}
            </Router>
        </CookiesProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('MK-app'));
