export const getAccountsState = state => state.accounts;
export const getAccountsData = state => getAccountsState(state).data;
export const getAccountIds = state => getAccountsState(state).ids;
export const getAccountById = (state, id) => getAccountsData(state)[id];
