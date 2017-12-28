import {
    GET_ACCOUNTS_LIST_STARTED,
    GET_ACCOUNTS_LIST_FINISHED,
    GET_ACCOUNTS_LIST_FAILED,
    CREATE_ACCOUNT_STARTED,
    CREATE_ACCOUNT_FINISHED,
    CREATE_ACCOUNT_FAILED,
    UPDATE_ACCOUNT_STARTED,
    UPDATE_ACCOUNT_FINISHED,
    UPDATE_ACCOUNT_FAILED,
    REMOVE_ACCOUNT_STARTED,
    REMOVE_ACCOUNT_FINISHED,
    REMOVE_ACCOUNT_FAILED
} from './actions';

import {
    getAccountListStartedHandler,
    getAccountListFinishedHandler,
    getAccountListFailedHandler,
    createAccountStartedHandler,
    createAccountFinishedHandler,
    createAccountFailedHandler,
    updateAccountStartedHandler,
    updateAccountFinishedHandler,
    updateAccountFailedHandler,
    removeAccountStartedHandler,
    removeAccountFinishedHandler,
    removeAccountFailedHandler
} from './reducerMethods';

const initialState = {
    fetchState: {
        fetching: false,
        error: null
    },
    ids: [],
    data: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ACCOUNTS_LIST_STARTED:
            return getAccountListStartedHandler(state);
        case GET_ACCOUNTS_LIST_FINISHED:
            return getAccountListFinishedHandler(state, action.accounts);
        case GET_ACCOUNTS_LIST_FAILED:
            return getAccountListFailedHandler(state, action.error);
        case CREATE_ACCOUNT_STARTED:
            return createAccountStartedHandler(state);
        case CREATE_ACCOUNT_FINISHED:
            return createAccountFinishedHandler(state, action.account);
        case CREATE_ACCOUNT_FAILED:
            return createAccountFailedHandler(state, action.error);
        case UPDATE_ACCOUNT_STARTED:
            return updateAccountStartedHandler(state);
        case UPDATE_ACCOUNT_FINISHED:
            return updateAccountFinishedHandler(state, action.account);
        case UPDATE_ACCOUNT_FAILED:
            return updateAccountFailedHandler(state, action.error);
        case REMOVE_ACCOUNT_STARTED:
            return removeAccountStartedHandler(state);
        case REMOVE_ACCOUNT_FINISHED:
            return removeAccountFinishedHandler(state, action.account);
        case REMOVE_ACCOUNT_FAILED:
            return removeAccountFailedHandler(state, action.error);
        default:
            return state;
    }
}
