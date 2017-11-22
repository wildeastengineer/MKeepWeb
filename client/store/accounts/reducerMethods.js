import { mapArrayToObject } from '../helpers';

export const getAccountListStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: true,
            error: null
        }
    };
};

export const getAccountListFinishedHandler = (state, accounts) => {
    return {
        ...state,
        fetchState: {
            fetched: true,
            inProgress: false,
            error: null
        },
        data: mapArrayToObject(accounts)
    };
};

export const getAccountListFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: false,
            error
        }
    };
};

export const createAccountStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: true,
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
            fetched: true,
            inProgress: false,
            error: null
        },
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
            fetched: false,
            inProgress: false,
            error
        }
    };
};

export const updateAccountStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: true,
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
            fetched: true,
            inProgress: false,
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
            fetched: false,
            inProgress: false,
            error
        }
    };
};

export const removeAccountStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: true,
            error: null
        }
    };
};

export const removeAccountFinishedHandler = (state, account) => {
    const accounts = {
        ...state.data
    };

    delete accounts[account._id];

    return {
        ...state,
        fetchState: {
            fetched: true,
            inProgress: false,
            error: null
        },
        data: accounts
    };
};

export const removeAccountFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: false,
            error
        }
    };
};
