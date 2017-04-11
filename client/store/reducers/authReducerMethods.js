export const authLogInEmailStartedHandler = (state) => {
    return {
        ...state,
        authorized: false,
        authorization: {
            inProgress: true,
            error: ''
        }
    };
};

export const authLogInEmailFinishedHandler = (state) => {
    return {
        ...state,
        authorized: true,
        authorization: {
            inProgress: false,
            error: ''
        }
    };
};

export const authLogInEmailFailedHandler = (state, error) => {
    return {
        ...state,
        authorized: false,
        authorization: {
            inProgress: false,
            error
        }
    };
};

export const authLogInCookieStartedHandler = (state) => {
    return {
        ...state,
        authorized: false,
        authorization: {
            inProgress: true,
            error: ''
        }
    };
};

export const authLogInCookieFinishedHandler = (state) => {
    return {
        ...state,
        authorized: true,
        authorization: {
            inProgress: false,
            error: ''
        }
    };
};

export const authLogInCookieFailedHandler = (state) => {
    return {
        ...state,
        authorized: false,
        authorization: {
            inProgress: false,
            error: ''
        }
    };
};

export const logOutHandler = () => {
    return {
        authorized: false,
        authorization: {
            inProgress: false,
            error: ''
        },
        profileFetched: false,
        profileFetching: {
            inProgress: false,
            error: ''
        },
        profile: {}
    };
};

export const getUserProfileStartedHandler = (state) => {
    return {
        ...state,
        profileFetched: false,
        profileFetching: {
            inProgress: true,
            error: ''
        },
        profile: {}
    };
};

export const getUserProfileFinishedHandler = (state, data) => {
    return {
        ...state,
        profileFetched: true,
        profileFetching: {
            inProgress: false,
            error: ''
        },
        profile: data
    };
};

export const getUserProfileFailedHandler = (state, error) => {
    return {
        ...state,
        profileFetched: false,
        profileFetching: {
            inProgress: false,
            error
        },
        profile: {}
    };
};
