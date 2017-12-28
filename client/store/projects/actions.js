import { push } from 'react-router-redux';
import { paths } from 'routes';
import { ProjectsRepository } from 'warehouse';

import {
    setProjectCurrencies,
    setProjectMainCurrency
} from '../currencies/actions';

export const GET_PROJECTS_LIST_STARTED = 'GET_PROJECTS_LIST_STARTED';
export const GET_PROJECTS_LIST_FINISHED = 'GET_PROJECTS_LIST_FINISHED';
export const GET_PROJECTS_LIST_FAILED = 'GET_PROJECTS_LIST_FAILED';

export const SET_CURRENT_PROJECT_STARTED = 'SET_CURRENT_PROJECT_STARTED';
export const SET_CURRENT_PROJECT_FINISHED = 'SET_CURRENT_PROJECT_FINISHED';
export const SET_CURRENT_PROJECT_FAILED = 'SET_CURRENT_PROJECT_FAILED';

export const CREATE_PROJECT_STARTED = 'CREATE_PROJECT_STARTED';
export const CREATE_PROJECT_FINISHED = 'CREATE_PROJECT_FINISHED';
export const CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED';

export function getProjectsListFinished(data) {
    return {
        type: GET_PROJECTS_LIST_FINISHED,
        data
    };
}

export function setCurrentProject(projectId, cookies, options = {}) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(setCurrentProjectStarted());

            const projectsRepository = new ProjectsRepository(cookies);

            projectsRepository.getById(projectId)
                .then((data) => {
                    const redirectUrl = options.redirect || paths.project.url.replace(':projectId', projectId);

                    dispatch(setCurrentProjectFinished(data));
                    dispatch(setProjectCurrencies(data.currencies));
                    dispatch(setProjectMainCurrency(data.mainCurrency));
                    dispatch(push(redirectUrl));

                    resolve(data);
                })
                .catch((error) => {
                    dispatch(setCurrentProjectFailed(error));
                    reject(error);
                });
        });
    };
}

export function createProject(projectData, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(createProjectStarted());

            const projectsRepository = new ProjectsRepository(cookies);

            projectsRepository.create(projectData)
                .then((project) => {
                    dispatch(createProjectFinished(project));
                    dispatch(setCurrentProject(project._id, cookies))
                        .then(resolve);
                })
                .catch((error) => {
                    dispatch(createProjectFailed(error));
                    reject(error);
                });
        });
    };
}

function setCurrentProjectStarted() {
    return {
        type: SET_CURRENT_PROJECT_STARTED
    };
}

function setCurrentProjectFinished(data) {
    return {
        type: SET_CURRENT_PROJECT_FINISHED,
        data
    };
}

function setCurrentProjectFailed(data) {
    return {
        type: SET_CURRENT_PROJECT_FAILED,
        data
    };
}

function createProjectStarted() {
    return {
        type: CREATE_PROJECT_STARTED
    };
}

function createProjectFinished(data) {
    return {
        type: CREATE_PROJECT_FINISHED,
        data
    };
}

function createProjectFailed(data) {
    return {
        type: CREATE_PROJECT_FAILED,
        data
    };
}
