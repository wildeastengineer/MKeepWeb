const authorizationFinishedHandler = (state, data) => {
    return {
        ...state,
        language: data.userProfile.lang,
        authorized: true,
        authorization: {
            inProgress: false,
            error: null
        },
        profileFetched: true,
        profileFetching: {
            inProgress: false,
            error: null
        },
        profile: {
            ...data.userProfile
        }
    };
};

export const authLogInEmailStartedHandler = (state) => {
    return {
        ...state,
        authorized: false,
        authorization: {
            inProgress: true,
            error: null
        }
    };
};

export const authLogInEmailFinishedHandler = (state, data) => {
    return authorizationFinishedHandler(state, data);
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
            error: null
        }
    };
};

export const authLogInCookieFinishedHandler = (state, data) => {
    return authorizationFinishedHandler(state, data);
};

export const authLogInCookieFailedHandler = (state) => {
    return {
        ...state,
        authorized: false,
        authorization: {
            inProgress: false,
            error: null
        }
    };
};

export const logOutHandler = (state) => {
    return {
        ...state,
        authorized: false,
        authorization: {
            inProgress: false,
            error: null
        },
        profileFetched: false,
        profileFetching: {
            inProgress: false,
            error: null
        },
        profile: {}
    };
};

export const createNewAccountStartedHandler = (state) => {
    return {
        ...state,
        authorized: false,
        authorization: {
            inProgress: true,
            error: null
        }
    };
};

export const createNewAccountFinishedHandler = (state, data) => {
    return authorizationFinishedHandler(state, data);
};

export const createNewAccountFailedHandler = (state, error) => {
    return {
        ...state,
        authorized: false,
        authorization: {
            inProgress: false,
            error
        }
    };
};
