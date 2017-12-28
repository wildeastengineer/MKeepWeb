import config from 'config';

import {
    GET_USER_PROFILE_STARTED,
    GET_USER_PROFILE_FINISHED,
    GET_USER_PROFILE_FAILED,
    CHANGE_PROFILE_LANGUAGE_FINISHED
} from './actions';

import {
    getUserProfileStartedHandler,
    getUserProfileFinishedHandler,
    getUserProfileFailedHandler,
    changeProfileLanguageFinishedHandler,
} from './reducerMethods';

const initialState = {
    fetchState: {
        fetched: false,
        inProgress: false,
        error: null
    },
    data: {
        lang: config.defaultLanguage
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_PROFILE_STARTED:
            return getUserProfileStartedHandler(state);
        case GET_USER_PROFILE_FINISHED:
            return getUserProfileFinishedHandler(state, action.data);
        case GET_USER_PROFILE_FAILED:
            return getUserProfileFailedHandler(state, action.error);
        case CHANGE_PROFILE_LANGUAGE_FINISHED:
            return changeProfileLanguageFinishedHandler(state, action.language);
        default:
            return state;
    }
}
