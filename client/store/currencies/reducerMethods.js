import { mapArrayToObject } from '../helpers';

export const getGlobalCurrenciesStartedHandler = (state) => {
    return {
        ...state,
        global: {
            fetchState: {
                fetched: false,
                inProgress: true,
                error: ''
            },
            data: {}
        }
    };
};

export const getGlobalCurrenciesFinishedHandler = (state, currencies) => {
    return {
        ...state,
        global: {
            fetchState: {
                fetched: true,
                inProgress: false,
                error: ''
            },
            data: currencies.reduce((data, currency) => {
                data[currency._id] = currency;

                return data;
            }, {})
        }
    };
};

export const getGlobalCurrenciesFailedHandler = (state, error) => {
    return {
        ...state,
        global: {
            fetchState: {
                fetched: false,
                inProgress: false,
                error
            },
            data: {}
        }
    };
};

export const updateProjectCurrenciesStartedHandler = (state) => {
    return {
        ...state,
        project: {
            fetchState: {
                fetched: false,
                inProgress: true,
                error: ''
            },
            data: {}
        }
    };
};

export const updateProjectCurrenciesFinishedHandler = (state, currencies) => {
    return {
        ...state,
        project: {
            fetchState: {
                fetched: true,
                inProgress: false,
                error: ''
            },
            data: mapArrayToObject(currencies)
        }
    };
};

export const updateProjectCurrenciesFailedHandler = (state, error) => {
    return {
        ...state,
        project: {
            fetchState: {
                fetched: false,
                inProgress: false,
                error
            },
            data: {}
        }
    };
};

export const setProjectCurrenciesHandler = (state, currencies) => {
    return updateProjectCurrenciesFinishedHandler(state, currencies);
};
