const getAccountsState = (state) => (state.accounts);
export const getAccounts = (state) => (getAccountsState(state).data);
