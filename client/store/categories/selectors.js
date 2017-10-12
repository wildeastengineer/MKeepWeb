const getCategoriesState = (state) => (state.categories);
export const getIncomeCategories = (state) => (getCategoriesState(state).income);
export const getExpenseCategories = (state) => (getCategoriesState(state).expense);
