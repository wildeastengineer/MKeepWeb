import { mapArrayToObject } from '../helpers';

const typeFlag = 'type';
const incomeTypeFlag = 'income';
const expenseTypeFlag = 'expense';

export const getCategoriesListStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: true,
            error: null
        }
    };
};

export const getCategoriesListFinishedHandler = (state, categories) => {
    const income = mapArrayToObject(categories.filter(category => category[typeFlag] === incomeTypeFlag));
    const expense = mapArrayToObject(categories.filter(category => category[typeFlag] === expenseTypeFlag));

    return {
        ...state,
        fetchState: {
            fetched: true,
            inProgress: false,
            error: null
        },
        income: populateParentCategories(income),
        expense: populateParentCategories(expense)
    };
};

export const getCategoriesListFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: false,
            error
        }
    };
};

export const createCategoryStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: true,
            error: null
        }
    };
};

export const createCategoryFinishedHandler = (state, category) => {
    const categoryData = {
        [category._id]: populateParentCategory(category, state[category.type])
    };

    const categoriesList = {
        [category.type]: {
            ...state[category.type],
            ...categoryData
        }
    };

    return {
        ...state,
        fetchState: {
            fetched: true,
            inProgress: false,
            error: null
        },
        ...categoriesList
    };
};

export const createCategoryFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: false,
            error
        }
    };
};

export const updateCategoryStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: true,
            error: null
        }
    };
};

export const updateCategoryFinishedHandler = (state, category) => {
    const originCategory = state[category.type][category._id];

    const updatedCategory = {
        [category._id]: {
            ...originCategory,
            ...populateParentCategory(category, state[category.type])
        }
    };

    const categoriesList = {
        [category.type]: {
            ...state[category.type],
            ...updatedCategory
        }
    };

    return {
        ...state,
        fetchState: {
            fetched: true,
            inProgress: false,
            error: null
        },
        ...categoriesList
    };
};

export const updateCategoryFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: false,
            error
        }
    };
};

export const removeCategoryStartedHandler = (state) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: true,
            error: null
        }
    };
};

export const removeCategoryFinishedHandler = (state, category) => {
    const restCategories = {
        ...state[category.type]
    };

    delete restCategories[category._id];

    const categoriesList = {
        [category.type]: restCategories
    };

    return {
        ...state,
        fetchState: {
            fetched: true,
            inProgress: false,
            error: null
        },
        ...categoriesList
    };
};

export const removeCategoryFailedHandler = (state, error) => {
    return {
        ...state,
        fetchState: {
            fetched: false,
            inProgress: false,
            error
        }
    };
};

const populateParentCategory = (category, categoriesMap) => {
    if (typeof category.parent === 'string') {
        category.parent = {
            ...categoriesMap[category.parent]
        };
    }

    return category;
};

const populateParentCategories = (categoriesMap) => {
    for (let categoryId in categoriesMap) {
        if (!categoriesMap.hasOwnProperty(categoryId)) {
            continue;
        }

        categoriesMap[categoryId] = populateParentCategory(categoriesMap[categoryId], categoriesMap);
    }

    return categoriesMap;
};
