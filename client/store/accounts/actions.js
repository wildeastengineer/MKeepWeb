import { AccountsRepository } from 'warehouse/repositories';

export const GET_ACCOUNTS_LIST_STARTED = 'GET_ACCOUNTS_LIST_STARTED';
export const GET_ACCOUNTS_LIST_FINISHED = 'GET_ACCOUNTS_LIST_FINISHED';
export const GET_ACCOUNTS_LIST_FAILED = 'GET_ACCOUNTS_LIST_FAILED';

export function getAccountsList(cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(getAccountsListStarted());

            const accountsRepository = new AccountsRepository(cookies);

            accountsRepository.getList()
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
