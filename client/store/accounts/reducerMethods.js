import { mapArrayToObject } from '../helpers';

export const getAccountListStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetching: true,
            error: null
        }
    };
};

export const getAccountListFinishedHandler = (state, accounts) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error: null
        },
        ids: accounts.map(account => account._id),
        data: mapArrayToObject(accounts)
    };
};

export const getAccountListFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error
        }
    };
};

export const createAccountStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetching: true,
            error: null
        }
    };
};

export const createAccountFinishedHandler = (state, account) => {
    const accountData = {
        [account._id]: account
    };

    return {
        ...state,
        fetchState: {
            fetching: false,
            error: null
        },
        ids: [...state.ids, account._id],
        data: {
            ...state.data,
            ...accountData
        }
    };
};

export const createAccountFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error
        }
    };
};

export const updateAccountStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetching: true,
            error: null
        }
    };
};

export const updateAccountFinishedHandler = (state, account) => {
    const originAccount = state.data[account._id];
    const updatedAccount = {
        [account._id]: {
            ...originAccount,
            ...account
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
            ...updatedAccount
        }
    };
};

export const updateAccountFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error
        }
    };
};

export const removeAccountStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetching: true,
            error: null
        }
    };
};

export const removeAccountFinishedHandler = (state, account) => {
    const accounts = {
        ...state.data
    };
    const accountIdIndex = state.ids.indexOf(account._id);

    delete accounts[account._id];

    return {
        ...state,
        fetchState: {
            fetching: false,
            error: null
        },
        ids: [
            ...state.ids.slice(0, accountIdIndex),
            ...state.ids.slice(accountIdIndex + 1)
        ],
        data: accounts
    };
};

export const removeAccountFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetching: false,
            error
        }
    };
};
