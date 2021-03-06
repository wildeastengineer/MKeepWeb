import { mapArrayToObject } from '../helpers';

export const getGlobalCurrenciesStartedHandler = (state) => {
    return {
        ...state,
        global: {
            fetchState: {
                fetched: false,
                inProgress: true,
                error: null
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
                error: null
            },
            data: mapArrayToObject(currencies)
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
                error: null
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
                error: null
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

export const updateProjectMainCurrencyStartedHandler = (state) => {
    return {
        ...state,
        mainCurrency: {
            ...state.mainCurrency,
            fetchState: {
                fetched: false,
                inProgress: true,
                error: null
            }
        }
    };
};

export const updateProjectMainCurrencyFinishedHandler = (state, currency) => {
    return {
        ...state,
        mainCurrency: {
            fetchState: {
                fetched: true,
                inProgress: false,
                error: null
            },
            data: currency
        }
    };
};

export const updateProjectMainCurrencyFailedHandler = (state, error) => {
    return {
        ...state,
        mainCurrency: {
            ...state.mainCurrency,
            fetchState: {
                fetched: false,
                inProgress: false,
                error
            }
        }
    };
};

export const setProjectMainCurrencyHandler = (state, currency) => {
    return updateProjectMainCurrencyFinishedHandler(state, currency);
};
