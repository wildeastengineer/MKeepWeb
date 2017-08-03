import { push } from 'react-router-redux';
import { paths } from 'routes';
import { ProjectsRepository } from 'warehouse';

import { setProjectCurrencies } from '../currencies/actions';

export const CREATE_NEW_PROJECT_STARTED = 'CREATE_NEW_PROJECT_STARTED';
export const GET_PROJECTS_LIST_FINISHED = 'GET_PROJECTS_LIST_FINISHED';

export const SET_CURRENT_PROJECT_STARTED = 'SET_CURRENT_PROJECT_STARTED';
export const SET_CURRENT_PROJECT_FINISHED = 'SET_CURRENT_PROJECT_FINISHED';
export const SET_CURRENT_PROJECT_FAILED = 'SET_CURRENT_PROJECT_FAILED';

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

function setCurrentProjectFailed(error) {
    return {
        type: SET_CURRENT_PROJECT_FAILED,
        error
    };
}
