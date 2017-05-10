import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers';

export default function (initialState = {}) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            routerMiddleware(browserHistory)
        )
    );
}
