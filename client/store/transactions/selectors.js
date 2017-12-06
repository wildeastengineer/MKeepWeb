export const getTransactionsState = state => state.transactions;
export const getTransactionsData = state => getTransactionsState(state).data;
export const getTransactionsIds = state => getTransactionsState(state).ids;
export const getTransactionById = (state, id) => getTransactionsData(state)[id];
