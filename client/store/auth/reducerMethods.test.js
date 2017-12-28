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

describe('reducers', () => {
    describe('authReducerMethods', () => {
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
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                newState = authLogInEmailStartedHandler(state);

                expect(newState).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                });
            });

            test('it should not mutate original state', () => {
                let state = {
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

                authLogInEmailStartedHandler(state);

                expect(state).toEqual({
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
                });
            });
        });

        describe('"authLogInEmailFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof authLogInEmailFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let actionData = {
                    userProfile: {
                        name: 'User Name'
                    }
                };
                let newState;
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                newState = authLogInEmailFinishedHandler(state, actionData);

                expect(newState).toEqual({
                    authorized: true,
                    authorization: {
                        inProgress: false,
                        error: null
                    },
                    profileFetched: true,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {
                        name: 'User Name'
                    }
                });
            });

            test('it should not mutate original state', () => {
                let actionData = {
                    userProfile: {
                        name: 'User Name'
                    }
                };
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                authLogInEmailFinishedHandler(state, actionData);

                expect(state).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
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
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
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
                        error: null
                    },
                    profile: {}
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                authLogInEmailFailedHandler(state, 'Some error');

                expect(state).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
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
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                newState = authLogInCookieStartedHandler(state);

                expect(newState).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                });
            });

            test('it should not mutate original state', () => {
                let state = {
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

                authLogInCookieStartedHandler(state);

                expect(state).toEqual({
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
                });
            });
        });

        describe('"authLogInCookieFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof authLogInCookieFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let actionData = {
                    userProfile: {
                        name: 'User Name'
                    }
                };
                let newState;
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                newState = authLogInCookieFinishedHandler(state, actionData);

                expect(newState).toEqual({
                    authorized: true,
                    authorization: {
                        inProgress: false,
                        error: null
                    },
                    profileFetched: true,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {
                        name: 'User Name'
                    }
                });
            });

            test('it should not mutate original state', () => {
                let actionData = {
                    userProfile: {
                        name: 'User Name'
                    }
                };
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                authLogInCookieFinishedHandler(state, actionData);

                expect(state).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
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
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                newState = authLogInCookieFailedHandler(state);

                expect(newState).toEqual({
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
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                authLogInCookieFailedHandler(state);

                expect(state).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                });
            });
        });

        describe('"logOutHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof logOutHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    authorized: true,
                    authorization: {
                        inProgress: false,
                        error: null
                    },
                    profileFetched: true,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {
                        name: 'User Name'
                    }
                };

                newState = logOutHandler(state);

                expect(newState).toEqual({
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
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    authorized: true,
                    authorization: {
                        inProgress: false,
                        error: null
                    },
                    profileFetched: true,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {
                        name: 'User Name'
                    }
                };

                logOutHandler(state);

                expect(state).toEqual({
                    authorized: true,
                    authorization: {
                        inProgress: false,
                        error: null
                    },
                    profileFetched: true,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {
                        name: 'User Name'
                    }
                });
            });
        });

        describe('"createNewAccountStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createNewAccountStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
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

                newState = createNewAccountStartedHandler(state);

                expect(newState).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                });
            });

            test('it should not mutate original state', () => {
                let state = {
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

                createNewAccountStartedHandler(state);

                expect(state).toEqual({
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
                });
            });
        });

        describe('"createNewAccountFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createNewAccountFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let actionData = {
                    userProfile: {
                        name: 'User Name'
                    }
                };
                let newState;
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                newState = createNewAccountFinishedHandler(state, actionData);

                expect(newState).toEqual({
                    authorized: true,
                    authorization: {
                        inProgress: false,
                        error: null
                    },
                    profileFetched: true,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {
                        name: 'User Name'
                    }
                });
            });

            test('it should not mutate original state', () => {
                let actionData = {
                    userProfile: {
                        name: 'User Name'
                    }
                };
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                createNewAccountFinishedHandler(state, actionData);

                expect(state).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                });
            });
        });

        describe('"createNewAccountFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createNewAccountFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                newState = createNewAccountFailedHandler(state, 'Some error');

                expect(newState).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: false,
                        error: 'Some error'
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                };

                createNewAccountFailedHandler(state, 'Some error');

                expect(state).toEqual({
                    authorized: false,
                    authorization: {
                        inProgress: true,
                        error: null
                    },
                    profileFetched: false,
                    profileFetching: {
                        inProgress: false,
                        error: null
                    },
                    profile: {}
                });
            });
        });
    });
});
