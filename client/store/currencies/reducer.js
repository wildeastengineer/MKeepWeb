import {
    UPDATE_GLOBAL_CURRENCIES_STARTED,
    UPDATE_GLOBAL_CURRENCIES_FINISHED,
    UPDATE_GLOBAL_CURRENCIES_FAILED,
    UPDATE_PROJECT_CURRENCIES_STARTED,
    UPDATE_PROJECT_CURRENCIES_FINISHED,
    UPDATE_PROJECT_CURRENCIES_FAILED,
    SET_PROJECT_CURRENCIES,
    UPDATE_PROJECT_MAIN_CURRENCY_STARTED,
    UPDATE_PROJECT_MAIN_CURRENCY_FINISHED,
    UPDATE_PROJECT_MAIN_CURRENCY_FAILED,
    SET_PROJECT_MAIN_CURRENCY
} from './actions';

import {
    getGlobalCurrenciesStartedHandler,
    getGlobalCurrenciesFinishedHandler,
    getGlobalCurrenciesFailedHandler,
    updateProjectCurrenciesStartedHandler,
    updateProjectCurrenciesFinishedHandler,
    updateProjectCurrenciesFailedHandler,
    setProjectCurrenciesHandler,
    updateProjectMainCurrencyStartedHandler,
    updateProjectMainCurrencyFinishedHandler,
    updateProjectMainCurrencyFailedHandler,
    setProjectMainCurrencyHandler
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
    },
    mainCurrency: {
        fetchState: {
            fetched: false,
            inProgress: false,
            error: ''
        },
        data: null
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
        case UPDATE_PROJECT_MAIN_CURRENCY_STARTED:
            return updateProjectMainCurrencyStartedHandler(state);
        case UPDATE_PROJECT_MAIN_CURRENCY_FINISHED:
            return updateProjectMainCurrencyFinishedHandler(state, action.currency);
        case UPDATE_PROJECT_MAIN_CURRENCY_FAILED:
            return updateProjectMainCurrencyFailedHandler(state, action.error);
        case SET_PROJECT_MAIN_CURRENCY:
            return setProjectMainCurrencyHandler(state, action.currency);
        default:
            return state;
    }
}
