export const getAccountsState = state => state.accounts;
export const getAccountsData = state => state.accounts.data;
export const getAccountIds = state => getAccountsState(state).ids;
export const getAccountById = (state, id) => getAccountsData(state)[id];
