import { AuthRepository, profileRepository } from 'repositories';

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

export const GET_USER_PROFILE_STARTED = 'GET_USER_PROFILE_STARTED';
export const GET_USER_PROFILE_FINISHED = 'GET_USER_PROFILE_FINISHED';
export const GET_USER_PROFILE_FAILED = 'GET_USER_PROFILE_FAILED';

/* Log in by email */
export function logInByEmail(email, password) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(logInByEmailStarted(email, password));

            const authRepository = new AuthRepository({
                type: 'client'
            });

            authRepository.logInByEmail(email, password)
                .then((data) => {
                    dispatch(logInByEmailFinished(data));
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
export function logInByCookie(req, res) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(logInByCookieStarted());

            const authRepository = new AuthRepository({
                type: 'server',
                req,
                res
            });

            authRepository.refreshTokens()
                .then((data) => {
                    dispatch(logInByCookieFinished(data));
                    resolve(data);
                })
                .catch((error) => {
                    dispatch(logInByCookieFailed(error));
                    reject(error)
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
export function logOut() {
    const authRepository = new AuthRepository({
        type: 'client'
    });

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

/* Get user profile */
export function getUserProfile() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(getUserProfileStart());

            profileRepository.getProfile()
                .then((data) => {
                    dispatch(getUserProfileFinished(data));
                    resolve();
                })
                .catch((error) => {
                    dispatch(getUserProfileFailed(error.message));
                    reject(error);
                });
        });
    };
}

function getUserProfileStart() {
    return {
        type: GET_USER_PROFILE_STARTED
    };
}

function getUserProfileFinished(data) {
    return {
        type: GET_USER_PROFILE_FINISHED,
        data
    };
}

function getUserProfileFailed(error) {
    return {
        type: GET_USER_PROFILE_FAILED,
        error
    };
}

/* Create new account */
export function createNewAccount(email, password) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(createNewAccountStart(email, password));

            const authRepository = new AuthRepository({
                type: 'client'
            });

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

// ToDo: move and "runRegistrationFlow" to another file

export function runRegistrationFlow(email, password) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(createNewAccount(email, password))
                .then(() => {
                    return dispatch(logInByEmail(email, password))
                })
                .then(() => {
                    return dispatch(getUserProfile());
                })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
}
