import {
    authLogInEmailStartedHandler,
    authLogInEmailFinishedHandler,
    authLogInEmailFailedHandler,
    authLogInCookieStartedHandler,
    authLogInCookieFinishedHandler,
    authLogInCookieFailedHandler
} from './authReducerMethods';

describe('reducers', () => {
    describe('"authLogInEmailStartedHandler" method', () => {
        test('it should return correct new state', () => {
            let newState;
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: false,
                    error: ''
                },
                data: {}
            };

            newState = authLogInEmailStartedHandler(state);

            expect(newState).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: false,
                    error: ''
                },
                data: {}
            };

            authLogInEmailStartedHandler(state);

            expect(state).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: false,
                    error: ''
                },
                data: {}
            });
        });
    });

    describe('"authLogInEmailFinishedHandler" method', () => {
        test('it should return correct new state', () => {
            let newState;
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            };

            newState = authLogInEmailFinishedHandler(state);

            expect(newState).toEqual({
                isAuthorized: true,
                fetching: {
                    inProgress: false,
                    error: ''
                },
                data: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            };

            authLogInEmailFinishedHandler(state);

            expect(state).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            });
        });
    });

    describe('"authLogInEmailFailedHandler" method', () => {
        test('it should return correct new state', () => {
            let newState;
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            };

            newState = authLogInEmailFailedHandler(state, 'Some error');

            expect(newState).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: false,
                    error: 'Some error'
                },
                data: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            };

            authLogInEmailFailedHandler(state, 'Some error');

            expect(state).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            });
        });
    });

    describe('"authLogInCookieStartedHandler" method', () => {
        test('it should return correct new state', () => {
            let newState;
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: false,
                    error: ''
                },
                data: {}
            };

            newState = authLogInCookieStartedHandler(state);

            expect(newState).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: false,
                    error: ''
                },
                data: {}
            };

            authLogInCookieStartedHandler(state);

            expect(state).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: false,
                    error: ''
                },
                data: {}
            });
        });
    });

    describe('"authLogInCookieFinishedHandler" method', () => {
        test('it should return correct new state', () => {
            let newState;
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            };

            newState = authLogInCookieFinishedHandler(state);

            expect(newState).toEqual({
                isAuthorized: true,
                fetching: {
                    inProgress: false,
                    error: ''
                },
                data: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            };

            authLogInCookieFinishedHandler(state);

            expect(state).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            });
        });
    });

    describe('"authLogInCookieFailedHandler" method', () => {
        test('it should return correct new state', () => {
            let newState;
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            };

            newState = authLogInCookieFailedHandler(state);

            expect(newState).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: false,
                    error: ''
                },
                data: {}
            });
        });

        test('it should not mutate original state', () => {
            let state = {
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            };

            authLogInCookieFailedHandler(state);

            expect(state).toEqual({
                isAuthorized: false,
                fetching: {
                    inProgress: true,
                    error: ''
                },
                data: {}
            });
        });
    });
});


