import { AuthRepository } from 'warehouse';
import { setUserProfile } from '../profile/actions'

export const AUTH_LOG_IN_EMAIL_STARTED = 'AUTH_LOG_IN_EMAIL_STARTED';
export const AUTH_LOG_IN_EMAIL_FINISHED = 'AUTH_LOG_IN_EMAIL_FINISHED';
export const AUTH_LOG_IN_EMAIL_FAILED = 'AUTH_LOG_IN_EMAIL_FAILED';

export const AUTH_LOG_IN_COOKIE_STARTED = 'AUTH_LOG_IN_COOKIE_STARTED';
export const AUTH_LOG_IN_COOKIE_FINISHED = 'AUTH_LOG_IN_COOKIE_FINISHED';
export const AUTH_LOG_IN_COOKIE_FAILED = 'AUTH_LOG_IN_COOKIE_FAILED';

export const AUTH_LOG_OUT = 'AUTH_LOG_OUT';

export const CREATE_NEW_ACCOUNT_STARTED = 'CREATE_NEW_ACCOUNT_STARTED';
export const CREATE_NEW_ACCOUNT_FINISHED = 'CREATE_NEW_ACCOUNT_FINISHED';
export const CREATE_NEW_ACCOUNT_FAILED = 'CREATE_NEW_ACCOUNT_FAILED';

/* Log in by email */
export function logInByEmail(email, password, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(logInByEmailStarted());

            const authRepository = new AuthRepository(cookies);

            authRepository.logInByEmail(email, password)
                .then((data) => {
                    dispatch(logInByEmailFinished(data));
                    dispatch(setUserProfile(data.userProfile));
                    resolve();
                })
                .catch((error) => {
                    dispatch(logInByEmailFailed(error));
                    reject(error);
                });
        });
    };
}

function logInByEmailStarted() {
    return {
        type: AUTH_LOG_IN_EMAIL_STARTED
    };
}

function logInByEmailFinished(data) {
    return {
        type: AUTH_LOG_IN_EMAIL_FINISHED,
        data
    };
}

function logInByEmailFailed(error) {
    return {
        type: AUTH_LOG_IN_EMAIL_FAILED,
        error
    };
}

/* Log in by cookie */
export function logInByCookies(cookies) {
    return (dispatch) => {
        return new Promise((resolve) => {
            dispatch(logInByCookieStarted());

            const authRepository = new AuthRepository(cookies);

            authRepository.refreshTokens()
                .then((data) => {
                    dispatch(logInByCookieFinished(data));
                    dispatch(setUserProfile(data.userProfile));
                    resolve();
                })
                .catch((error) => {
                    dispatch(logInByCookieFailed(error));
                    resolve()
                });
        });
    };
}

function logInByCookieStarted() {
    return {
        type: AUTH_LOG_IN_COOKIE_STARTED
    };
}

function logInByCookieFinished(data) {
    return {
        type: AUTH_LOG_IN_COOKIE_FINISHED,
        data
    };
}

function logInByCookieFailed(error) {
    return {
        type: AUTH_LOG_IN_COOKIE_FAILED,
        error
    };
}

/* Log out */
export function logOut(cookies) {
    const authRepository = new AuthRepository(cookies);

    return (dispatch) => {
        authRepository.logOut();
        dispatch(logOutStart());
    };
}

function logOutStart() {
    return {
        type: AUTH_LOG_OUT
    };
}

/* Create new account */
export function createNewAccount(email, password, cookies) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(createNewAccountStart(email, password));

            const authRepository = new AuthRepository(cookies);

            authRepository.createNewAccount(email, password)
                .then((data) => {
                    dispatch(createNewAccountFinished(data));
                    resolve(data);
                })
                .catch((error) => {
                    dispatch(createNewAccountFailed(error));
                    reject(error);
                });
        });
    };
}

function createNewAccountStart() {
    return {
        type: CREATE_NEW_ACCOUNT_STARTED
    };
}

function createNewAccountFinished(data) {
    return {
        type: CREATE_NEW_ACCOUNT_FINISHED,
        data
    };
}

function createNewAccountFailed(error) {
    return {
        type: CREATE_NEW_ACCOUNT_FAILED,
        error
    };
}
