import { TransactionsRepository } from 'warehouse/repositories';

export const GET_TRANSACTIONS_LIST_STARTED = 'GET_TRANSACTIONS_LIST_STARTED';
export const GET_TRANSACTIONS_LIST_FINISHED = 'GET_TRANSACTIONS_LIST_FINISHED';
export const GET_TRANSACTIONS_LIST_FAILED = 'GET_TRANSACTIONS_LIST_FAILED';

export const CREATE_TRANSACTION_STARTED = 'CREATE_TRANSACTION_STARTED';
export const CREATE_TRANSACTION_FINISHED = 'CREATE_TRANSACTION_FINISHED';
export const CREATE_TRANSACTION_FAILED = 'CREATE_TRANSACTION_FAILED';

export const UPDATE_TRANSACTION_STARTED = 'UPDATE_TRANSACTION_STARTED';
export const UPDATE_TRANSACTION_FINISHED = 'UPDATE_TRANSACTION_FINISHED';
export const UPDATE_TRANSACTION_FAILED = 'UPDATE_TRANSACTION_FAILED';

export const REMOVE_TRANSACTION_STARTED = 'REMOVE_TRANSACTION_STARTED';
export const REMOVE_TRANSACTION_FINISHED = 'REMOVE_TRANSACTION_FINISHED';
export const REMOVE_TRANSACTION_FAILED = 'REMOVE_TRANSACTION_FAILED';

export function getTransactionsList(projectId, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(getTransactionsListStarted());

            const transactionsRepository = new TransactionsRepository(cookies);

            transactionsRepository.getList(projectId)
                .then((transactions) => {
                    dispatch(getTransactionsListFinished(transactions));
                    resolve(transactions);
                })
                .catch((error) => {
                    dispatch(getTransactionsListFailed(error));
                    reject(error);
                });
        });
    };
}

export function createTransaction(projectId, transactionData, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(createTransactionStarted());

            const transactionsRepository = new TransactionsRepository(cookies);

            transactionsRepository.create(projectId, transactionData)
                .then((transaction) => {
                    dispatch(createTransactionFinished(transaction));
                    resolve(transaction);
                })
                .catch((error) => {
                    dispatch(createTransactionFailed(error));
                    reject(error);
                });
        });
    };
}

export function updateTransaction(projectId, transactionId, transactionData, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(updateTransactionStarted());

            const transactionsRepository = new TransactionsRepository(cookies);

            transactionsRepository.update(projectId, transactionId, transactionData)
                .then((transaction) => {
                    dispatch(updateTransactionFinished(transaction));
                    resolve(transaction);
                })
                .catch((error) => {
                    dispatch(updateTransactionFailed(error));
                    reject(error);
                });
        });
    };
}

export function removeTransaction(projectId, transaction, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(removeTransactionStarted());

            const transactionsRepository = new TransactionsRepository(cookies);

            transactionsRepository.remove(projectId, transaction._id)
                .then(() => {
                    dispatch(removeTransactionFinished(transaction));
                    resolve(transaction);
                })
                .catch((error) => {
                    dispatch(removeTransactionFailed(error));
                    reject(error);
                });
        });
    };
}

function getTransactionsListStarted() {
    return {
        type: GET_TRANSACTIONS_LIST_STARTED
    };
}

function getTransactionsListFinished(transactions) {
    return {
        type: GET_TRANSACTIONS_LIST_FINISHED,
        transactions
    };
}

function getTransactionsListFailed(error) {
    return {
        type: GET_TRANSACTIONS_LIST_FAILED,
        error
    };
}

function createTransactionStarted() {
    return {
        type: CREATE_TRANSACTION_STARTED
    };
}

function createTransactionFinished(transaction) {
    return {
        type: CREATE_TRANSACTION_FINISHED,
        transaction
    };
}

function createTransactionFailed(error) {
    return {
        type: CREATE_TRANSACTION_FAILED,
        error
    };
}

function updateTransactionStarted() {
    return {
        type: UPDATE_TRANSACTION_STARTED
    };
}

function updateTransactionFinished(transaction) {
    return {
        type: UPDATE_TRANSACTION_FINISHED,
        transaction
    };
}

function updateTransactionFailed(error) {
    return {
        type: UPDATE_TRANSACTION_FAILED,
        error
    };
}

function removeTransactionStarted() {
    return {
        type: REMOVE_TRANSACTION_STARTED
    };
}

function removeTransactionFinished(transaction) {
    return {
        type: REMOVE_TRANSACTION_FINISHED,
        transaction
    };
}

function removeTransactionFailed(error) {
    return {
        type: REMOVE_TRANSACTION_FAILED,
        error
    };
}
