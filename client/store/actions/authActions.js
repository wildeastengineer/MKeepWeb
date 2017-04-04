import { authRepository, profileRepository } from 'repositories';
//import { getProjectsList } from 'redux/actions/projectsActions';


//const profileRep = new ProfileRepository();

export const AUTH_LOG_IN_EMAIL_STARTED = 'AUTH_LOG_IN_EMAIL_STARTED';
export const AUTH_LOG_IN_EMAIL_FINISHED = 'AUTH_LOG_IN_EMAIL_FINISHED';
export const AUTH_LOG_IN_EMAIL_FAILED = 'AUTH_LOG_IN_EMAIL_FAILED';

export const AUTH_LOG_IN_COOKIE_STARTED = 'AUTH_LOG_IN_COOKIE_STARTED';
export const AUTH_LOG_IN_COOKIE_FINISHED = 'AUTH_LOG_IN_COOKIE_FINISHED';
export const AUTH_LOG_IN_COOKIE_FAILED = 'AUTH_LOG_IN_COOKIE_FAILED';

// export const AUTH_LOG_OUT = 'AUTH_LOG_OUT';
// export const CREATE_NEW_ACCOUNT_STARTED = 'CREATE_NEW_ACCOUNT_STARTED';
// export const CREATE_NEW_ACCOUNT_FINISHED = 'CREATE_NEW_ACCOUNT_FINISHED';
// export const CREATE_NEW_ACCOUNT_FAILED = 'CREATE_NEW_ACCOUNT_FAILED';

export const GET_USER_PROFILE_STARTED = 'GET_USER_PROFILE_STARTED';
export const GET_USER_PROFILE_FINISHED = 'GET_USER_PROFILE_FINISHED';
export const GET_USER_PROFILE_FAILED = 'GET_USER_PROFILE_FAILED';

/* Log in by email */
export function logInByEmail(email, password) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(logInByEmailStarted(email, password));

            authRepository.logInByEmail(email, password)
                .then(() => {
                    dispatch(logInByEmailFinished());
                    resolve();
                })
                .catch((error) => {
                    dispatch(logInByEmailFailed(error.message));
                    reject();
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

export function logInByCookie(cookie) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(logInByCookieStarted());

            const refreshToken = cookie.refreshToken;

            if (!refreshToken) {
                const errorMessage = 'Refresh token is not defined';

                dispatch(logInByCookieFailed(errorMessage));

                return resolve();
            }

            authRepository.refreshTokens(refreshToken)
                .then((data) => {
                    dispatch(logInByCookieFinished());
                    resolve(data);
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

function logInByCookieFinished() {
    return {
        type: AUTH_LOG_IN_COOKIE_FINISHED
    };
}

function logInByCookieFailed(error) {
    return {
        type: AUTH_LOG_IN_COOKIE_FAILED,
        error
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
                    reject();
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

export function runClientAuthFlow(email, password) {
    return (dispatch) => {
        dispatch(logInByEmail(email, password))
            .then(() => {
                dispatch(getUserProfile());
            });
    };
}

// ToDo: Write runServerAuthFlow

/* Create new account */
// export function createNewAccount(email, password) {
//     return (dispatch) => {
//         dispatch(createNewAccountStart(email, password));
//
//         auth.createNewAccount(email, password)
//             .then(() => {
//                 dispatch(createNewAccountFinished());
//                 logInByEmail(email, password);
//             })
//             .catch((error) => {
//                 dispatch(createNewAccountFailed(error));
//             });
//     };
// }
//
// function createNewAccountStart() {
//     return {
//         type: CREATE_NEW_ACCOUNT_STARTED
//     };
// }
//
// function createNewAccountFinished(data) {
//     return {
//         type: CREATE_NEW_ACCOUNT_FINISHED,
//         data
//     };
// }
//
// function createNewAccountFailed(error) {
//     return {
//         type: CREATE_NEW_ACCOUNT_FAILED,
//         error
//     };
// }

/* Log out */
// export function logOut() {
//     return {
//         type: AUTH_LOG_OUT
//     };
// }
