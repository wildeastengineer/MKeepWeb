import {
    getUserProfileStartedHandler,
    getUserProfileFinishedHandler,
    getUserProfileFailedHandler,
    changeProfileLanguageFinishedHandler
} from './reducerMethods';

describe('reducers', () => {
    describe('profileReducerMethods', () => {
        describe('"getUserProfileStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getUserProfileStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
                };

                newState = getUserProfileStartedHandler(state);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
                };

                getUserProfileStartedHandler(state);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
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
                    name: 'User Name',
                    lang: 'ru'
                };
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
                };

                newState = getUserProfileFinishedHandler(state, profileData);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: ''
                    },
                    data: {
                        name: 'User Name',
                        lang: 'ru'
                    }
                });
            });

            test('it should not mutate original state', () => {
                let profileData = {
                    name: 'User Name'
                };
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
                };

                getUserProfileFinishedHandler(state, profileData);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
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
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
                };

                newState = getUserProfileFailedHandler(state, 'Some Error');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: 'Some Error'
                    },
                    data: {
                        lang: 'en'
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
                };

                getUserProfileFailedHandler(state, 'Some Error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: ''
                    },
                    data: {
                        lang: 'en'
                    }
                });
            });
        });

        describe('"changeProfileLanguageFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof changeProfileLanguageFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: ''
                    },
                    data: {
                        name: 'User Name',
                        lang: 'en'
                    }
                };

                newState = changeProfileLanguageFinishedHandler(state, 'ru');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: ''
                    },
                    data: {
                        name: 'User Name',
                        lang: 'ru'
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: ''
                    },
                    data: {
                        name: 'User Name',
                        lang: 'en'
                    }
                };

                changeProfileLanguageFinishedHandler(state, 'ru');

                expect(state).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: ''
                    },
                    data: {
                        name: 'User Name',
                        lang: 'en'
                    }
                });
            });
        });
    });
});
