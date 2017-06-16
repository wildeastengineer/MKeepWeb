import {
    CREATE_NEW_PROJECT_STARTED,
    GET_PROJECTS_LIST_FINISHED,
    SET_CURRENT_PROJECT_STARTED,
    SET_CURRENT_PROJECT_FINISHED,
    SET_CURRENT_PROJECT_FAILED
} from './actions';

import {
    createNewProjectStartedHandler,
    getProjectsListFinishedHandler,
    setCurrentProjectStartedHandler,
    setCurrentProjectStartedFinished,
    setCurrentProjectStartedFailed
} from './reducerMethods';

const initialState = {
    currentProject: {
        data: null,
        fetching: {
            inProgress: false,
            error: null
        }
    },
    projectsList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_NEW_PROJECT_STARTED:
            return createNewProjectStartedHandler(state);
        case GET_PROJECTS_LIST_FINISHED:
            return getProjectsListFinishedHandler(state, action.data);
        case SET_CURRENT_PROJECT_STARTED:
            return setCurrentProjectStartedHandler(state);
        case SET_CURRENT_PROJECT_FINISHED:
            return setCurrentProjectStartedFinished(state, action.data);
        case SET_CURRENT_PROJECT_FAILED:
            return setCurrentProjectStartedFailed(state, action.error);
        default:
            return state;
    }
}
