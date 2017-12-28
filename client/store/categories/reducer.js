import {
    GET_CATEGORIES_LIST_STARTED,
    GET_CATEGORIES_LIST_FINISHED,
    GET_CATEGORIES_LIST_FAILED,
    CREATE_CATEGORY_STARTED,
    CREATE_CATEGORY_FINISHED,
    CREATE_CATEGORY_FAILED,
    UPDATE_CATEGORY_STARTED,
    UPDATE_CATEGORY_FINISHED,
    UPDATE_CATEGORY_FAILED,
    REMOVE_CATEGORY_STARTED,
    REMOVE_CATEGORY_FINISHED,
    REMOVE_CATEGORY_FAILED
} from './actions';

import {
    getCategoriesListStartedHandler,
    getCategoriesListFinishedHandler,
    getCategoriesListFailedHandler,
    createCategoryStartedHandler,
    createCategoryFinishedHandler,
    createCategoryFailedHandler,
    updateCategoryStartedHandler,
    updateCategoryFinishedHandler,
    updateCategoryFailedHandler,
    removeCategoryStartedHandler,
    removeCategoryFinishedHandler,
    removeCategoryFailedHandler
} from './reducerMethods';

const initialState = {
    fetchState: {
        fetched: false,
        inProgress: false,
        error: null
    },
    income: {},
    expense: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_LIST_STARTED:
            return getCategoriesListStartedHandler(state);
        case GET_CATEGORIES_LIST_FINISHED:
            return getCategoriesListFinishedHandler(state, action.categories);
        case GET_CATEGORIES_LIST_FAILED:
            return getCategoriesListFailedHandler(state, action.error);
        case CREATE_CATEGORY_STARTED:
            return createCategoryStartedHandler(state);
        case CREATE_CATEGORY_FINISHED:
            return createCategoryFinishedHandler(state, action.category);
        case CREATE_CATEGORY_FAILED:
            return createCategoryFailedHandler(state, action.error);
        case UPDATE_CATEGORY_STARTED:
            return updateCategoryStartedHandler(state);
        case UPDATE_CATEGORY_FINISHED:
            return updateCategoryFinishedHandler(state, action.category);
        case UPDATE_CATEGORY_FAILED:
            return updateCategoryFailedHandler(state, action.error);
        case REMOVE_CATEGORY_STARTED:
            return removeCategoryStartedHandler(state);
        case REMOVE_CATEGORY_FINISHED:
            return removeCategoryFinishedHandler(state, action.category);
        case REMOVE_CATEGORY_FAILED:
            return removeCategoryFailedHandler(state, action.error);
        default:
            return state;
    }
}
