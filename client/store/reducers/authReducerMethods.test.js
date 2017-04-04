import {
    authLogInEmailStartedHandler,
    authLogInEmailFinishedHandler,
    authLogInEmailFailedHandler,
    authLogInCookieStartedHandler,
    authLogInCookieFinishedHandler,
    authLogInCookieFailedHandler,
    getUserProfileStartedHandler,
    getUserProfileFinishedHandler,
    getUserProfileFailedHandler
} from './authReducerMethods';

describe('reducers', () => {
    describe('"authLogInEmailStartedHandler" method', () => {
        test('it should be defined', () => {
            expect(typeof authLogInEmailStartedHandler).toBe('function');
        });

        test('it should return correct new state', () => {
            let newState;
            let state = {
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

            newState = authLogInEmailStartedHandler(state);

            expect(newState).toEqual({
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
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

            authLogInEmailStartedHandler(state);

            expect(state).toEqual({
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
            });
        });
    });

    describe('"authLogInEmailFinishedHandler" method', () => {
        test('it should be defined', () => {
            expect(typeof authLogInEmailFinishedHandler).toBe('function');
        });

        test('it should return correct new state', () => {
            let newState;
            let state = {
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            };

            newState = authLogInEmailFinishedHandler(state);

            expect(newState).toEqual({
                authorized: true,
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
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            };

            authLogInEmailFinishedHandler(state);

            expect(state).toEqual({
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            });
        });
    });

    describe('"authLogInEmailFailedHandler" method', () => {
        test('it should be defined', () => {
            expect(typeof authLogInEmailFailedHandler).toBe('function');
        });

        test('it should return correct new state', () => {
            let newState;
            let state = {
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            };

            newState = authLogInEmailFailedHandler(state, 'Some error');

            expect(newState).toEqual({
                authorized: false,
                authorization: {
                    inProgress: false,
                    error: 'Some error'
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            };

            authLogInEmailFailedHandler(state, 'Some error');

            expect(state).toEqual({
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            });
        });
    });

    describe('"authLogInCookieStartedHandler" method', () => {
        test('it should be defined', () => {
            expect(typeof authLogInCookieStartedHandler).toBe('function');
        });

        test('it should return correct new state', () => {
            let newState;
            let state = {
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

            newState = authLogInCookieStartedHandler(state);

            expect(newState).toEqual({
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
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

            authLogInCookieStartedHandler(state);

            expect(state).toEqual({
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
            });
        });
    });

    describe('"authLogInCookieFinishedHandler" method', () => {
        test('it should be defined', () => {
            expect(typeof authLogInCookieFinishedHandler).toBe('function');
        });

        test('it should return correct new state', () => {
            let newState;
            let state = {
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            };

            newState = authLogInCookieFinishedHandler(state);

            expect(newState).toEqual({
                authorized: true,
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
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            };

            authLogInCookieFinishedHandler(state);

            expect(state).toEqual({
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            });
        });
    });

    describe('"authLogInCookieFailedHandler" method', () => {
        test('it should be defined', () => {
            expect(typeof authLogInCookieFailedHandler).toBe('function');
        });

        test('it should return correct new state', () => {
            let newState;
            let state = {
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            };

            newState = authLogInCookieFailedHandler(state);

            expect(newState).toEqual({
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
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            };

            authLogInCookieFailedHandler(state);

            expect(state).toEqual({
                authorized: false,
                authorization: {
                    inProgress: true,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {}
            });
        });
    });

    // -------------

    describe('"getUserProfileStartedHandler" method', () => {
        test('it should be defined', () => {
            expect(typeof getUserProfileStartedHandler).toBe('function');
        });

        test('it should return correct new state', () => {
            let newState;
            let state = {
                authorized: true,
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

            newState = getUserProfileStartedHandler(state);

            expect(newState).toEqual({
                authorized: true,
                authorization: {
                    inProgress: false,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: true,
                    error: ''
                },
                profile: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                authorized: true,
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

            getUserProfileStartedHandler(state);

            expect(state).toEqual({
                authorized: true,
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
            });
        });
    });

    describe('"getUserProfileFinishedHandler" method', () => {
        test('it should be defined', () => {
            expect(typeof getUserProfileFinishedHandler).toBe('function');
        });

        test('it should return correct new state', () => {
            let newState;
            let profileData = {
                name: 'User Name'
            };
            let state = {
                authorized: true,
                authorization: {
                    inProgress: false,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: true,
                    error: ''
                },
                profile: {}
            };

            newState = getUserProfileFinishedHandler(state, profileData);

            expect(newState).toEqual({
                authorized: true,
                authorization: {
                    inProgress: false,
                    error: ''
                },
                profileFetched: true,
                profileFetching: {
                    inProgress: false,
                    error: ''
                },
                profile: {
                    name: 'User Name'
                }
            });
        });

        test('it should not mutate original state', () => {
            let profileData = {
                name: 'User Name'
            };
            let state = {
                authorized: true,
                authorization: {
                    inProgress: false,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: true,
                    error: ''
                },
                profile: {}
            };

            getUserProfileFinishedHandler(state, profileData);

            expect(state).toEqual({
                authorized: true,
                authorization: {
                    inProgress: false,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: true,
                    error: ''
                },
                profile: {}
            });
        });
    });

    describe('"getUserProfileFailedHandler" method', () => {
        test('it should be defined', () => {
            expect(typeof getUserProfileFailedHandler).toBe('function');
        });

        test('it should return correct new state', () => {
            let newState;
            let state = {
                authorized: true,
                authorization: {
                    inProgress: false,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: true,
                    error: ''
                },
                profile: {}
            };

            newState = getUserProfileFailedHandler(state, 'Some Error');

            expect(newState).toEqual({
                authorized: true,
                authorization: {
                    inProgress: false,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: false,
                    error: 'Some Error'
                },
                profile: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                authorized: true,
                authorization: {
                    inProgress: false,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: true,
                    error: ''
                },
                profile: {}
            };

            getUserProfileFailedHandler(state, 'Some Error');

            expect(state).toEqual({
                authorized: true,
                authorization: {
                    inProgress: false,
                    error: ''
                },
                profileFetched: false,
                profileFetching: {
                    inProgress: true,
                    error: ''
                },
                profile: {}
            });
        });
    });
});


