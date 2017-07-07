const getCurrenciesState = (state) => (state.currencies);
const getGlobalCurrencies = (state) => (getCurrenciesState(state).global);
const getProjectCurrencies = (state) => (getCurrenciesState(state).project);

export const getGlobalCurrenciesList = (state) => (getGlobalCurrencies(state).data);
export const getProjectCurrenciesList = (state) => (getProjectCurrencies(state).data);
