import { mapArrayToObject } from '../helpers';

export const getProjectsListStartedHandler = (state) => {
    return {
        ...state,
        projectsList: {
            ...state.projectsList,
            fetchState: {
                ...state.projectsList.fetchState,
                fetching: true
            }
        }
    };
};

export const getProjectsListFinishedHandler = (state, projectsList) => {
    return {
        ...state,
        projectsList: {
            fetchState: {
                fetching: false,
                error: null
            },
            ids: projectsList.map(project => project._id),
            data: mapArrayToObject(projectsList)
        }
    };
};

export const getProjectsListFailedHandler = (state, error) => {
    return {
        ...state,
        projectsList: {
            ...state.projectsList,
            fetchState: {
                fetching: false,
                error
            }
        }
    };
};

export const setCurrentProjectStartedHandler = (state) => {
    return {
        ...state,
        currentProject: {
            ...state.currentProject,
            fetchState: {
                ...state.currentProject.fetchState,
                fetching: true
            }
        }
    };
};

export const setCurrentProjectFinishedHandler = (state, project) => {
    return {
        ...state,
        currentProject: {
            fetchState: {
                fetching: false,
                error: null
            },
            data: project
        }
    };
};

export const setCurrentProjectFailedHandler = (state, error) => {
    return {
        ...state,
        currentProject: {
            ...state.currentProject,
            fetchState: {
                fetching: false,
                error
            }
        }
    };
};

export const createProjectStartedHandler = (state) => {
    return {
        ...state,
        projectsList: {
            ...state.projectsList,
            fetchState: {
                ...state.projectsList.fetchState,
                fetching: true
            }
        }
    };
};

export const createProjectFinishedHandler = (state, project) => {
    return {
        ...state,
        projectsList: {
            fetchState: {
                fetching: false,
                error: null
            },
            ids: [...state.projectsList.ids, project._id],
            data: {
                ...state.projectsList.data,
                [project._id]: {
                    ...project
                }
            }
        }
    };
};

export const createProjectFailedHandler = (state, error) => {
    return {
        ...state,
        projectsList: {
            ...state.projectsList,
            fetchState: {
                fetching: false,
                error
            }
        }
    };
};
