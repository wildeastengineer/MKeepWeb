import { CategoriesRepository } from 'warehouse/repositories';

export const GET_CATEGORIES_LIST_STARTED = 'GET_CATEGORIES_LIST_STARTED';
export const GET_CATEGORIES_LIST_FINISHED = 'GET_CATEGORIES_LIST_FINISHED';
export const GET_CATEGORIES_LIST_FAILED = 'GET_CATEGORIES_LIST_FAILED';

export const CREATE_CATEGORY_STARTED = 'CREATE_CATEGORY_STARTED';
export const CREATE_CATEGORY_FINISHED = 'CREATE_CATEGORY_FINISHED';
export const CREATE_CATEGORY_FAILED = 'CREATE_CATEGORY_FAILED';

export const UPDATE_CATEGORY_STARTED = 'UPDATE_CATEGORY_STARTED';
export const UPDATE_CATEGORY_FINISHED = 'UPDATE_CATEGORY_FINISHED';
export const UPDATE_CATEGORY_FAILED = 'UPDATE_CATEGORY_FAILED';

export const REMOVE_CATEGORY_STARTED = 'REMOVE_CATEGORY_STARTED';
export const REMOVE_CATEGORY_FINISHED = 'REMOVE_CATEGORY_FINISHED';
export const REMOVE_CATEGORY_FAILED = 'REMOVE_CATEGORY_FAILED';

export function getCategoriesList(projectId, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(getCategoriesListStarted());

            const categoriesRepository = new CategoriesRepository(cookies);

            categoriesRepository.getList(projectId)
                .then((categories) => {
                    dispatch(getCategoriesListFinished(categories));
                    resolve(categories);
                })
                .catch((error) => {
                    dispatch(getCategoriesListFailed(error));
                    reject(error);
                });
        });
    };
}

export function createCategory(projectId, categoryData, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(createCategoryStarted());

            const categoriesRepository = new CategoriesRepository(cookies);

            categoriesRepository.create(projectId, categoryData)
                .then((category) => {
                    dispatch(createCategoryFinished(category));
                    resolve(category);
                })
                .catch((error) => {
                    dispatch(createCategoryFailed(error));
                    reject(error);
                });
        });
    };
}

export function updateCategory(projectId, categoryId, categoryData, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(updateCategoryStarted());

            const categoriesRepository = new CategoriesRepository(cookies);

            categoriesRepository.update(projectId, categoryId, categoryData)
                .then((category) => {
                    dispatch(updateCategoryFinished(category));
                    resolve(category);
                })
                .catch((error) => {
                    dispatch(updateCategoryFailed(error));
                    reject(error);
                });
        });
    };
}

export function removeCategory(projectId, category, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(removeCategoryStarted());

            const categoriesRepository = new CategoriesRepository(cookies);

            categoriesRepository.remove(projectId, category._id)
                .then(() => {
                    dispatch(removeCategoryFinished(category));
                    resolve(category);
                })
                .catch((error) => {
                    dispatch(removeCategoryFailed(error));
                    reject(error);
                });
        });
    };
}

function getCategoriesListStarted() {
    return {
        type: GET_CATEGORIES_LIST_STARTED
    };
}

function getCategoriesListFinished(categories) {
    return {
        type: GET_CATEGORIES_LIST_FINISHED,
        categories
    };
}

function getCategoriesListFailed(error) {
    return {
        type: GET_CATEGORIES_LIST_FAILED,
        error
    };
}

function createCategoryStarted() {
    return {
        type: CREATE_CATEGORY_STARTED
    };
}

function createCategoryFinished(category) {
    return {
        type: CREATE_CATEGORY_FINISHED,
        category
    };
}

function createCategoryFailed(error) {
    return {
        type: CREATE_CATEGORY_FAILED,
        error
    };
}

function updateCategoryStarted() {
    return {
        type: UPDATE_CATEGORY_STARTED
    };
}

function updateCategoryFinished(category) {
    return {
        type: UPDATE_CATEGORY_FINISHED,
        category
    };
}

function updateCategoryFailed(error) {
    return {
        type: UPDATE_CATEGORY_FAILED,
        error
    };
}

function removeCategoryStarted() {
    return {
        type: REMOVE_CATEGORY_STARTED
    };
}

function removeCategoryFinished(category) {
    return {
        type: REMOVE_CATEGORY_FINISHED,
        category
    };
}

function removeCategoryFailed(error) {
    return {
        type: REMOVE_CATEGORY_FAILED,
        error
    };
}
