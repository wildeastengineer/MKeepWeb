export const getUserProfileStartedHandler = (state) => {
    return {
        fetchState: {
            fetched: false,
            inProgress: true,
            error: ''
        },
        data: {
            lang: state.data.lang
        }
    };
};

export const getUserProfileFinishedHandler = (state, data) => {
    return {
        fetchState: {
            fetched: true,
            inProgress: false,
            error: ''
        },
        data
    };
};

export const getUserProfileFailedHandler = (state, error) => {
    return {
        fetchState: {
            fetched: false,
            inProgress: false,
            error
        },
        data: {
            lang: state.data.lang
        }
    };
};

export const changeProfileLanguageFinishedHandler = (state, lang) => {
    return {
        ...state,
        data: {
            ...state.data,
            lang
        }
    };
};
