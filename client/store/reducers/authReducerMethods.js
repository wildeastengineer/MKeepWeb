export const authLogInEmailStartedHandler = (state) => {
    return Object.assign({}, state, {
        fetching: Object.assign({}, state.fetching, {
            inProgress: true
        })
    });
};

export const authLogInEmailFinishedHandler = (state) => {
    return Object.assign({}, state, {
        isAuthorized: true,
        fetching: Object.assign({}, state.fetching, {
            inProgress: false,
            error: ""
        })
    });
};

export const authLogInEmailFailedHandler = (state, error) => {
    return Object.assign({}, state, {
        isAuthorized: false,
        fetching: Object.assign({}, state.fetching, {
            inProgress: false,
            error: error
        }),
        data: {}
    });
};

export const authLogInCookieStartedHandler = (state) => {
    return Object.assign({}, state, {
        fetching: Object.assign({}, state.fetching, {
            inProgress: true
        })
    });
};

export const authLogInCookieFinishedHandler = (state) => {
    return Object.assign({}, state, {
        isAuthorized: true,
        fetching: Object.assign({}, state.fetching, {
            inProgress: false,
            error: ""
        })
    });
};

export const authLogInCookieFailedHandler = (state) => {
    return Object.assign({}, state, {
        isAuthorized: false,
        fetching: Object.assign({}, state.fetching, {
            inProgress: false
        }),
        data: {}
    });
};
