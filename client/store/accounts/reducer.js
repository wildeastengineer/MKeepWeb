import {
    GET_ACCOUNTS_LIST_STARTED,
    GET_ACCOUNTS_LIST_FINISHED,
    GET_ACCOUNTS_LIST_FAILED
} from './actions';

import {
    getAccountListStartedHandler,
    getAccountListFinishedHandler,
    getAccountListFailedHandler
} from './reducerMethods';

const initialState = {
    fetchState: {
        fetched: false,
        inProgress: false,
        error: ''
    },
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
        default:
            return state;
    }
}
