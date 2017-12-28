import config from 'config';
import {
    AUTH_LOG_IN_EMAIL_STARTED,
    AUTH_LOG_IN_EMAIL_FINISHED,
    AUTH_LOG_IN_EMAIL_FAILED,
    AUTH_LOG_IN_COOKIE_STARTED,
    AUTH_LOG_IN_COOKIE_FINISHED,
    AUTH_LOG_IN_COOKIE_FAILED,
    AUTH_LOG_OUT,
    CREATE_NEW_ACCOUNT_STARTED,
    CREATE_NEW_ACCOUNT_FINISHED,
    CREATE_NEW_ACCOUNT_FAILED
} from './actions';

import {
    authLogInEmailStartedHandler,
    authLogInEmailFinishedHandler,
    authLogInEmailFailedHandler,
    authLogInCookieStartedHandler,
    authLogInCookieFinishedHandler,
    authLogInCookieFailedHandler,
    logOutHandler,
    createNewAccountStartedHandler,
    createNewAccountFinishedHandler,
    createNewAccountFailedHandler
} from './reducerMethods';

const initialState = {
    language: config.defaultLanguage,
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

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_LOG_IN_EMAIL_STARTED:
            return authLogInEmailStartedHandler(state);
        case AUTH_LOG_IN_EMAIL_FINISHED:
            return authLogInEmailFinishedHandler(state, action.data);
        case AUTH_LOG_IN_EMAIL_FAILED:
            return authLogInEmailFailedHandler(state, action.error);
        case AUTH_LOG_IN_COOKIE_STARTED:
            return authLogInCookieStartedHandler(state);
        case AUTH_LOG_IN_COOKIE_FINISHED:
            return authLogInCookieFinishedHandler(state, action.data);
        case AUTH_LOG_IN_COOKIE_FAILED:
            return authLogInCookieFailedHandler(state);
        case AUTH_LOG_OUT:
            return logOutHandler(state);
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
