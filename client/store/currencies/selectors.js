const getCurrenciesState = (state) => (state.currencies);
const getGlobalCurrenciesState = (state) => (getCurrenciesState(state).global);
const getProjectCurrenciesState = (state) => (getCurrenciesState(state).project);
const getMainCurrencyState = (state) => (getCurrenciesState(state).mainCurrency);

export const getGlobalCurrenciesList = (state) => (getGlobalCurrenciesState(state).data);
export const getProjectCurrenciesList = (state) => (getProjectCurrenciesState(state).data);
export const getMainCurrency = (state) => (getMainCurrencyState(state).data);
export const getMainCurrencyId = (state) => {
    const mainCurrency = getMainCurrency(state);

    return mainCurrency ? mainCurrency._id : null;
};