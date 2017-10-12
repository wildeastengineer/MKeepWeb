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
