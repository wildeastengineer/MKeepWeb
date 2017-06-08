import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers';

export default function (initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(
            thunk,
            routerMiddleware(browserHistory)
        ))
    );

    if (module.hot) {
        module.hot.accept('./reducers', () =>
            /*eslint-env node*/
            store.replaceReducer(require('./reducers').default)
        );
    }

    return store;
}
