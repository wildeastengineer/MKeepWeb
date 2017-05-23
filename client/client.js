import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { getRoutes } from 'routes';
import Store from 'store';

const store = Store(window.REDUX_INITIAL_STATE || {});
const history = syncHistoryWithStore(browserHistory, store);

const app = (
    <Provider store={store}>
        <Router history={history}>
            {getRoutes(store)}
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('MK-app'));
