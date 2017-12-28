const getCategoriesState = (state) => (state.categories);

export const getIncomeCategories = (state) => (getCategoriesState(state).income);

export const getExpenseCategories = (state) => (getCategoriesState(state).expense);

export const getCategoryById = (state, categoryId) => {
    return getIncomeCategories(state)[categoryId] ||
        getExpenseCategories(state)[categoryId] ||
        null;
};
