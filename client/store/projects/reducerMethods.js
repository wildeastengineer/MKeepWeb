export const createNewProjectStartedHandler = (state) => {
    return {
        ...state
    };
};

export const getProjectsListFinishedHandler = (state, projectsList) => {
    return {
        ...state,
        projectsList
    };
};

export const setCurrentProjectStartedHandler = (state) => {
    return {
        ...state,
        currentProject: {
            data: null,
            fetching: {
                inProgress: true,
                error: null
            }
        }
    };
};

export const setCurrentProjectStartedFinished = (state, project) => {
    return {
        ...state,
        currentProject: {
            data: project,
            fetching: {
                inProgress: false,
                error: null
            }
        }
    };
};

export const setCurrentProjectStartedFailed = (state, error) => {
    return {
        ...state,
        currentProject: {
            data: null,
            fetching: {
                inProgress: false,
                error
            }
        }
    };
};
