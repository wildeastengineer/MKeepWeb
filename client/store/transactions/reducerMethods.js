import { mapArrayToObject } from '../helpers';

export const getTransactionListStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetching: true,
            error: null
        }
    };
};

export const getTransactionListFinishedHandler = (state, transactions) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error: null
        },
        ids: transactions.map(transaction => transaction._id),
        data: mapArrayToObject(transactions)
    };
};

export const getTransactionListFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error
        }
    };
};

export const createTransactionStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetching: true,
            error: null
        }
    };
};

export const createTransactionFinishedHandler = (state, transaction) => {
    const transactionData = {
        [transaction._id]: transaction
    };

    return {
        ...state,
        fetchState: {
            fetching: false,
            error: null
        },
        ids: [...state.ids, transaction._id],
        data: {
            ...state.data,
            ...transactionData
        }
    };
};

export const createTransactionFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error
        }
    };
};

export const updateTransactionStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetching: true,
            error: null
        }
    };
};

export const updateTransactionFinishedHandler = (state, transaction) => {
    const originTransaction = state.data[transaction._id];
    const updatedTransaction = {
        [transaction._id]: {
            ...originTransaction,
            ...transaction
        }
    };

    return {
        ...state,
        fetchState: {
            fetching: false,
            error: null
        },
        data: {
            ...state.data,
            ...updatedTransaction
        }
    };
};

export const updateTransactionFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error
        }
    };
};

export const removeTransactionStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetching: true,
            error: null
        }
    };
};

export const removeTransactionFinishedHandler = (state, transaction) => {
    const transactions = {
        ...state.data
    };
    const transactionIdIndex = state.ids.indexOf(transaction._id);

    delete transactions[transaction._id];

    return {
        ...state,
        fetchState: {
            fetching: false,
            error: null
        },
        ids: [
            ...state.ids.slice(0, transactionIdIndex),
            ...state.ids.slice(transactionIdIndex + 1)
        ],
        data: transactions
    };
};

export const removeTransactionFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error
        }
    };
};
