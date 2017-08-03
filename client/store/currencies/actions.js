import { CurrenciesRepository } from 'warehouse/repositories';

export const UPDATE_GLOBAL_CURRENCIES_STARTED = 'UPDATE_GLOBAL_CURRENCIES_STARTED';
export const UPDATE_GLOBAL_CURRENCIES_FINISHED = 'UPDATE_GLOBAL_CURRENCIES_FINISHED';
export const UPDATE_GLOBAL_CURRENCIES_FAILED = 'UPDATE_GLOBAL_CURRENCIES_FAILED';

export const UPDATE_PROJECT_CURRENCIES_STARTED = 'UPDATE_PROJECT_CURRENCIES_STARTED';
export const UPDATE_PROJECT_CURRENCIES_FINISHED = 'UPDATE_PROJECT_CURRENCIES_FINISHED';
export const UPDATE_PROJECT_CURRENCIES_FAILED = 'UPDATE_PROJECT_CURRENCIES_FAILED';

export const SET_PROJECT_CURRENCIES = 'SET_PROJECT_CURRENCIES';

export function updateGlobalCurrencies(cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(updateGlobalCurrenciesStarted());

            const currenciesRepository = new CurrenciesRepository(cookies);

            currenciesRepository.getGlobal()
                .then((currencies) => {
                    dispatch(updateGlobalCurrenciesFinished(currencies));
                    resolve(currencies);
                })
                .catch((error) => {
                    dispatch(updateGlobalCurrenciesFailed(error));
                    reject(error);
                });
        });
    };
}

export function updateProjectCurrencies(projectId, currencies, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(updateProjectCurrenciesStarted());

            const currenciesRepository = new CurrenciesRepository(cookies);

            currenciesRepository.updateProjectCurrencies(projectId, currencies)
                .then((updatedCurrencies) => {
                    dispatch(updateProjectCurrenciesFinished(updatedCurrencies));
                    resolve(updatedCurrencies);
                })
                .catch((error) => {
                    dispatch(updateProjectCurrenciesFailed(error));
                    reject(error);
                });
        });
    };
}

export function setProjectCurrencies(currencies) {
    return {
        type: SET_PROJECT_CURRENCIES,
        currencies
    };
}

function updateGlobalCurrenciesStarted() {
    return {
        type: UPDATE_GLOBAL_CURRENCIES_STARTED
    };
}

function updateGlobalCurrenciesFinished(currencies) {
    return {
        type: UPDATE_GLOBAL_CURRENCIES_FINISHED,
        currencies
    };
}

function updateGlobalCurrenciesFailed(error) {
    return {
        type: UPDATE_GLOBAL_CURRENCIES_FAILED,
        error
    };
}

function updateProjectCurrenciesStarted() {
    return {
        type: UPDATE_PROJECT_CURRENCIES_STARTED
    };
}

function updateProjectCurrenciesFinished(currencies) {
    return {
        type: UPDATE_PROJECT_CURRENCIES_FINISHED,
        currencies
    };
}

function updateProjectCurrenciesFailed(error) {
    return {
        type: UPDATE_PROJECT_CURRENCIES_FAILED,
        error
    };
}
