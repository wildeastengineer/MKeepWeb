import {
    UPDATE_GLOBAL_CURRENCIES_STARTED,
    UPDATE_GLOBAL_CURRENCIES_FINISHED,
    UPDATE_GLOBAL_CURRENCIES_FAILED,
    UPDATE_PROJECT_CURRENCIES_STARTED,
    UPDATE_PROJECT_CURRENCIES_FINISHED,
    UPDATE_PROJECT_CURRENCIES_FAILED,
    SET_PROJECT_CURRENCIES
} from './actions';

import {
    getGlobalCurrenciesStartedHandler,
    getGlobalCurrenciesFinishedHandler,
    getGlobalCurrenciesFailedHandler,
    updateProjectCurrenciesStartedHandler,
    updateProjectCurrenciesFinishedHandler,
    updateProjectCurrenciesFailedHandler,
    setProjectCurrenciesHandler
} from './reducerMethods';

const initialState = {
    global: {
        fetchState: {
            fetched: false,
            inProgress: false,
            error: ''
        },
        data: {}
    },
    project: {
        fetchState: {
            fetched: false,
            inProgress: false,
            error: ''
        },
        data: {}
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_GLOBAL_CURRENCIES_STARTED:
            return getGlobalCurrenciesStartedHandler(state);
        case UPDATE_GLOBAL_CURRENCIES_FINISHED:
            return getGlobalCurrenciesFinishedHandler(state, action.currencies);
        case UPDATE_GLOBAL_CURRENCIES_FAILED:
            return getGlobalCurrenciesFailedHandler(state, action.error);
        case UPDATE_PROJECT_CURRENCIES_STARTED:
            return updateProjectCurrenciesStartedHandler(state);
        case UPDATE_PROJECT_CURRENCIES_FINISHED:
            return updateProjectCurrenciesFinishedHandler(state, action.currencies);
        case UPDATE_PROJECT_CURRENCIES_FAILED:
            return updateProjectCurrenciesFailedHandler(state, action.error);
        case SET_PROJECT_CURRENCIES:
            return setProjectCurrenciesHandler(state, action.currencies);
        default:
            return state;
    }
}
