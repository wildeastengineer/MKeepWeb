import {
    AUTH_LOG_IN_EMAIL_STARTED,
    AUTH_LOG_IN_EMAIL_FINISHED,
    AUTH_LOG_IN_EMAIL_FAILED,
    AUTH_LOG_IN_COOKIE_STARTED,
    AUTH_LOG_IN_COOKIE_FINISHED,
    AUTH_LOG_IN_COOKIE_FAILED,
    AUTH_LOG_OUT,
    GET_USER_PROFILE_STARTED,
    GET_USER_PROFILE_FINISHED,
    GET_USER_PROFILE_FAILED,
    CREATE_NEW_ACCOUNT_STARTED,
    CREATE_NEW_ACCOUNT_FINISHED,
    CREATE_NEW_ACCOUNT_FAILED
} from 'store/actions/authActions';

import {
    authLogInEmailStartedHandler,
    authLogInEmailFinishedHandler,
    authLogInEmailFailedHandler,
    authLogInCookieStartedHandler,
    authLogInCookieFinishedHandler,
    authLogInCookieFailedHandler,
    logOutHandler,
    getUserProfileStartedHandler,
    getUserProfileFinishedHandler,
    getUserProfileFailedHandler,
    createNewAccountStartedHandler,
    createNewAccountFinishedHandler,
    createNewAccountFailedHandler
} from './authReducerMethods';

const initialState = {
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

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_LOG_IN_EMAIL_STARTED:
            return authLogInEmailStartedHandler(state);
        case AUTH_LOG_IN_EMAIL_FINISHED:
            return authLogInEmailFinishedHandler(state);
        case AUTH_LOG_IN_EMAIL_FAILED:
            return authLogInEmailFailedHandler(state, action.error);
        case AUTH_LOG_IN_COOKIE_STARTED:
            return authLogInCookieStartedHandler(state);
        case AUTH_LOG_IN_COOKIE_FINISHED:
            return authLogInCookieFinishedHandler(state);
        case AUTH_LOG_IN_COOKIE_FAILED:
            return authLogInCookieFailedHandler(state);
        case AUTH_LOG_OUT:
            return logOutHandler();
        case GET_USER_PROFILE_STARTED:
            return getUserProfileStartedHandler(state);
        case GET_USER_PROFILE_FINISHED:
            return getUserProfileFinishedHandler(state, action.data);
        case GET_USER_PROFILE_FAILED:
            return getUserProfileFailedHandler(state, action.error);
        case CREATE_NEW_ACCOUNT_STARTED:
            return createNewAccountStartedHandler(state);
        case CREATE_NEW_ACCOUNT_FINISHED:
            return createNewAccountFinishedHandler(state, action.data);
        case CREATE_NEW_ACCOUNT_FAILED:
            return createNewAccountFailedHandler(state, action.error);
        default:
            return state;
    }
}
