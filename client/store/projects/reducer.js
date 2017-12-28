import {
    GET_PROJECTS_LIST_STARTED,
    GET_PROJECTS_LIST_FINISHED,
    GET_PROJECTS_LIST_FAILED,

    SET_CURRENT_PROJECT_STARTED,
    SET_CURRENT_PROJECT_FINISHED,
    SET_CURRENT_PROJECT_FAILED,

    CREATE_PROJECT_STARTED,
    CREATE_PROJECT_FINISHED,
    CREATE_PROJECT_FAILED
} from './actions';

import {
    getProjectsListStartedHandler,
    getProjectsListFinishedHandler,
    getProjectsListFailedHandler,

    setCurrentProjectStartedHandler,
    setCurrentProjectFinishedHandler,
    setCurrentProjectFailedHandler,

    createProjectStartedHandler,
    createProjectFinishedHandler,
    createProjectFailedHandler
} from './reducerMethods';

const initialState = {
    currentProject: {
        fetchState: {
            fetching: false,
            error: null
        },
        data: {}
    },
    projectsList: {
        fetchState: {
            fetching: false,
            error: null
        },
        ids: [],
        data: {}
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS_LIST_STARTED:
            return getProjectsListStartedHandler(state);
        case GET_PROJECTS_LIST_FINISHED:
            return getProjectsListFinishedHandler(state, action.data);
        case GET_PROJECTS_LIST_FAILED:
            return getProjectsListFailedHandler(state, action.data);

        case SET_CURRENT_PROJECT_STARTED:
            return setCurrentProjectStartedHandler(state);
        case SET_CURRENT_PROJECT_FINISHED:
            return setCurrentProjectFinishedHandler(state, action.data);
        case SET_CURRENT_PROJECT_FAILED:
            return setCurrentProjectFailedHandler(state, action.data);

        case CREATE_PROJECT_STARTED:
            return createProjectStartedHandler(state);
        case CREATE_PROJECT_FINISHED:
            return createProjectFinishedHandler(state, action.data);
        case CREATE_PROJECT_FAILED:
            return createProjectFailedHandler(state, action.data);

        default:
            return state;
    }
}
