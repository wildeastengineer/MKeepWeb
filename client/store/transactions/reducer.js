import {
    GET_TRANSACTIONS_LIST_STARTED,
    GET_TRANSACTIONS_LIST_FINISHED,
    GET_TRANSACTIONS_LIST_FAILED,
    CREATE_TRANSACTION_STARTED,
    CREATE_TRANSACTION_FINISHED,
    CREATE_TRANSACTION_FAILED,
    UPDATE_TRANSACTION_STARTED,
    UPDATE_TRANSACTION_FINISHED,
    UPDATE_TRANSACTION_FAILED,
    REMOVE_TRANSACTION_STARTED,
    REMOVE_TRANSACTION_FINISHED,
    REMOVE_TRANSACTION_FAILED
} from './actions';

import {
    getTransactionListStartedHandler,
    getTransactionListFinishedHandler,
    getTransactionListFailedHandler,
    createTransactionStartedHandler,
    createTransactionFinishedHandler,
    createTransactionFailedHandler,
    updateTransactionStartedHandler,
    updateTransactionFinishedHandler,
    updateTransactionFailedHandler,
    removeTransactionStartedHandler,
    removeTransactionFinishedHandler,
    removeTransactionFailedHandler
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
        case GET_TRANSACTIONS_LIST_STARTED:
            return getTransactionListStartedHandler(state);
        case GET_TRANSACTIONS_LIST_FINISHED:
            return getTransactionListFinishedHandler(state, action.transactions);
        case GET_TRANSACTIONS_LIST_FAILED:
            return getTransactionListFailedHandler(state, action.error);
        case CREATE_TRANSACTION_STARTED:
            return createTransactionStartedHandler(state);
        case CREATE_TRANSACTION_FINISHED:
            return createTransactionFinishedHandler(state, action.transaction);
        case CREATE_TRANSACTION_FAILED:
            return createTransactionFailedHandler(state, action.error);
        case UPDATE_TRANSACTION_STARTED:
            return updateTransactionStartedHandler(state);
        case UPDATE_TRANSACTION_FINISHED:
            return updateTransactionFinishedHandler(state, action.transaction);
        case UPDATE_TRANSACTION_FAILED:
            return updateTransactionFailedHandler(state, action.error);
        case REMOVE_TRANSACTION_STARTED:
            return removeTransactionStartedHandler(state);
        case REMOVE_TRANSACTION_FINISHED:
            return removeTransactionFinishedHandler(state, action.transaction);
        case REMOVE_TRANSACTION_FAILED:
            return removeTransactionFailedHandler(state, action.error);
        default:
            return state;
    }
}
