import { ProfileRepository } from 'repositories';
import { getProjectsListFinished } from '../projects/actions'

export const CHANGE_PROFILE_LANGUAGE_FINISHED = 'CHANGE_PROFILE_LANGUAGE_FINISHED';

export const GET_USER_PROFILE_STARTED = 'GET_USER_PROFILE_STARTED';
export const GET_USER_PROFILE_FINISHED = 'GET_USER_PROFILE_FINISHED';
export const GET_USER_PROFILE_FAILED = 'GET_USER_PROFILE_FAILED';

export function changeProfileLanguage(language) {
    return (dispatch) => {
        const profileRepository = new ProfileRepository();

        profileRepository.changeLanguage(language);

        dispatch(changeProfileLanguageFinished(language));
    };
}

function changeProfileLanguageFinished(language) {
    return {
        type: CHANGE_PROFILE_LANGUAGE_FINISHED,
        language
    };
}

/* Get user profile */
export function getUserProfile() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(getUserProfileStart());

            const profileRepository = new ProfileRepository();

            profileRepository.getProfile()
                .then((data) => {
                    dispatch(setUserProfile(data));
                    resolve();
                })
                .catch((error) => {
                    dispatch(getUserProfileFailed(error.message));
                    reject(error);
                });
        });
    };
}

export function setUserProfile(profile) {
    return (dispatch) => {
        dispatch(getUserProfileFinished(profile));
        dispatch(getProjectsListFinished(profile.projects));
    };
}

function getUserProfileStart() {
    return {
        type: GET_USER_PROFILE_STARTED
    };
}

export function getUserProfileFinished(data) {
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