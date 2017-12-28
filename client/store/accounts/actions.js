import { AccountsRepository } from 'warehouse/repositories';

export const GET_ACCOUNTS_LIST_STARTED = 'GET_ACCOUNTS_LIST_STARTED';
export const GET_ACCOUNTS_LIST_FINISHED = 'GET_ACCOUNTS_LIST_FINISHED';
export const GET_ACCOUNTS_LIST_FAILED = 'GET_ACCOUNTS_LIST_FAILED';

export const CREATE_ACCOUNT_STARTED = 'CREATE_ACCOUNT_STARTED';
export const CREATE_ACCOUNT_FINISHED = 'CREATE_ACCOUNT_FINISHED';
export const CREATE_ACCOUNT_FAILED = 'CREATE_ACCOUNT_FAILED';

export const UPDATE_ACCOUNT_STARTED = 'UPDATE_ACCOUNT_STARTED';
export const UPDATE_ACCOUNT_FINISHED = 'UPDATE_ACCOUNT_FINISHED';
export const UPDATE_ACCOUNT_FAILED = 'UPDATE_ACCOUNT_FAILED';

export const REMOVE_ACCOUNT_STARTED = 'REMOVE_ACCOUNT_STARTED';
export const REMOVE_ACCOUNT_FINISHED = 'REMOVE_ACCOUNT_FINISHED';
export const REMOVE_ACCOUNT_FAILED = 'REMOVE_ACCOUNT_FAILED';

export function getAccountsList(projectId, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(getAccountsListStarted());

            const accountsRepository = new AccountsRepository(cookies);

            accountsRepository.getList(projectId)
                .then((accounts) => {
                    dispatch(getAccountsListFinished(accounts));
                    resolve(accounts);
                })
                .catch((error) => {
                    dispatch(getAccountsListFailed(error));
                    reject(error);
                });
        });
    };
}

export function createAccount(projectId, accountData, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(createAccountStarted());

            const accountsRepository = new AccountsRepository(cookies);

            accountsRepository.create(projectId, accountData)
                .then((account) => {
                    dispatch(createAccountFinished(account));
                    resolve(account);
                })
                .catch((error) => {
                    dispatch(createAccountFailed(error));
                    reject(error);
                });
        });
    };
}

export function updateAccount(projectId, accountId, accountData, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(updateAccountStarted());

            const accountsRepository = new AccountsRepository(cookies);

            accountsRepository.update(projectId, accountId, accountData)
                .then((account) => {
                    dispatch(updateAccountFinished(account));
                    resolve(account);
                })
                .catch((error) => {
                    dispatch(updateAccountFailed(error));
                    reject(error);
                });
        });
    };
}

export function removeAccount(projectId, account, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(removeAccountStarted());

            const accountsRepository = new AccountsRepository(cookies);

            accountsRepository.remove(projectId, account._id)
                .then(() => {
                    dispatch(removeAccountFinished(account));
                    resolve(account);
                })
                .catch((error) => {
                    dispatch(removeAccountFailed(error));
                    reject(error);
                });
        });
    };
}

function getAccountsListStarted() {
    return {
        type: GET_ACCOUNTS_LIST_STARTED
    };
}

function getAccountsListFinished(accounts) {
    return {
        type: GET_ACCOUNTS_LIST_FINISHED,
        accounts
    };
}

function getAccountsListFailed(error) {
    return {
        type: GET_ACCOUNTS_LIST_FAILED,
        error
    };
}

function createAccountStarted() {
    return {
        type: CREATE_ACCOUNT_STARTED
    };
}

function createAccountFinished(account) {
    return {
        type: CREATE_ACCOUNT_FINISHED,
        account
    };
}

function createAccountFailed(error) {
    return {
        type: CREATE_ACCOUNT_FAILED,
        error
    };
}

function updateAccountStarted() {
    return {
        type: UPDATE_ACCOUNT_STARTED
    };
}

function updateAccountFinished(account) {
    return {
        type: UPDATE_ACCOUNT_FINISHED,
        account
    };
}

function updateAccountFailed(error) {
    return {
        type: UPDATE_ACCOUNT_FAILED,
        error
    };
}

function removeAccountStarted() {
    return {
        type: REMOVE_ACCOUNT_STARTED
    };
}

function removeAccountFinished(account) {
    return {
        type: REMOVE_ACCOUNT_FINISHED,
        account
    };
}

function removeAccountFailed(error) {
    return {
        type: REMOVE_ACCOUNT_FAILED,
        error
    };
}
