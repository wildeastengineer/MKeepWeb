import {
    getGlobalCurrenciesStartedHandler,
    getGlobalCurrenciesFinishedHandler,
    getGlobalCurrenciesFailedHandler,
    updateProjectCurrenciesStartedHandler,
    updateProjectCurrenciesFinishedHandler,
    updateProjectCurrenciesFailedHandler
} from './reducerMethods';

describe('reducers', () => {
    describe('currenceisReducerMethods', () => {
        describe('"getGlobalCurrenciesStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getGlobalCurrenciesStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                };

                newState = getGlobalCurrenciesStartedHandler(state);

                expect(newState).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                };

                getGlobalCurrenciesStartedHandler(state);

                expect(state).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                });
            });
        });

        describe('"getGlobalCurrenciesFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getGlobalCurrenciesFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let currencies = [
                    {
                        _id: '58b0224f6cb3d82317129618',
                        iso: 'AUD',
                        created: '2017-02-24T12:08:47.131Z',
                        sign: '$',
                        name: 'Dollar',
                        country: 'Australia',
                        modified: '2017-02-24T12:08:47.131Z'
                    },
                    {
                        _id: '58b0224f6cb3d82317129619',
                        iso: 'GBP',
                        created: '2017-02-24T12:08:47.131Z',
                        sign: '£',
                        name: 'Pound',
                        country: 'United Kingdom',
                        modified: '2017-02-24T12:08:47.131Z'
                    }
                ];
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                };

                newState = getGlobalCurrenciesFinishedHandler(state, currencies);

                expect(newState).toEqual({
                    global: {
                        fetchState: {
                            fetched: true,
                            inProgress: false,
                            error: ''
                        },
                        data: {
                            '58b0224f6cb3d82317129618': {
                                _id: '58b0224f6cb3d82317129618',
                                iso: 'AUD',
                                created: '2017-02-24T12:08:47.131Z',
                                sign: '$',
                                name: 'Dollar',
                                country: 'Australia',
                                modified: '2017-02-24T12:08:47.131Z'
                            },
                            '58b0224f6cb3d82317129619': {
                                _id: '58b0224f6cb3d82317129619',
                                iso: 'GBP',
                                created: '2017-02-24T12:08:47.131Z',
                                sign: '£',
                                name: 'Pound',
                                country: 'United Kingdom',
                                modified: '2017-02-24T12:08:47.131Z'
                            }
                        }
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                });
            });

            test('it should not mutate original state', () => {
                let currencies = [
                    {
                        _id: '58b0224f6cb3d82317129618',
                        iso: 'AUD',
                        created: '2017-02-24T12:08:47.131Z',
                        sign: '$',
                        name: 'Dollar',
                        country: 'Australia',
                        modified: '2017-02-24T12:08:47.131Z'
                    },
                    {
                        _id: '58b0224f6cb3d82317129619',
                        iso: 'GBP',
                        created: '2017-02-24T12:08:47.131Z',
                        sign: '£',
                        name: 'Pound',
                        country: 'United Kingdom',
                        modified: '2017-02-24T12:08:47.131Z'
                    }
                ];
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                };

                getGlobalCurrenciesFinishedHandler(state, currencies);

                expect(state).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                });
            });
        });

        describe('"getGlobalCurrenciesFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getGlobalCurrenciesFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                };

                newState = getGlobalCurrenciesFailedHandler(state, 'Some Error');

                expect(newState).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: 'Some Error'
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                };

                getGlobalCurrenciesFailedHandler(state, 'Some Error');

                expect(state).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                });
            });
        });

        describe('"updateProjectCurrenciesStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof updateProjectCurrenciesStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                };

                newState = updateProjectCurrenciesStartedHandler(state);

                expect(newState).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                };

                updateProjectCurrenciesStartedHandler(state);

                expect(state).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    }
                });
            });
        });

        describe('"updateProjectCurrenciesFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof updateProjectCurrenciesFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let currencies = [
                    {
                        _id: '58b0224f6cb3d8231712961e',
                        iso: 'EUR',
                        created: '2017-02-24T12:08:47.131Z',
                        sign: '€',
                        name: 'Euro',
                        country: 'Euro Member',
                        modified: '2017-02-24T12:08:47.131Z'
                    },
                    {
                        _id: '58b0224f6cb3d8231712961f',
                        iso: 'ILS',
                        created: '2017-02-24T12:08:47.131Z',
                        sign: '₪',
                        name: 'Shekel',
                        country: 'Israel',
                        modified: '2017-02-24T12:08:47.131Z'
                    }
                ];
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    }
                };

                newState = updateProjectCurrenciesFinishedHandler(state, currencies);

                expect(newState).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: true,
                            inProgress: false,
                            error: ''
                        },
                        data: {
                            '58b0224f6cb3d8231712961e': {
                                _id: '58b0224f6cb3d8231712961e',
                                iso: 'EUR',
                                created: '2017-02-24T12:08:47.131Z',
                                sign: '€',
                                name: 'Euro',
                                country: 'Euro Member',
                                modified: '2017-02-24T12:08:47.131Z'
                            },
                            '58b0224f6cb3d8231712961f': {
                                _id: '58b0224f6cb3d8231712961f',
                                iso: 'ILS',
                                created: '2017-02-24T12:08:47.131Z',
                                sign: '₪',
                                name: 'Shekel',
                                country: 'Israel',
                                modified: '2017-02-24T12:08:47.131Z'
                            }
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let currencies = [
                    {
                        _id: '58b0224f6cb3d8231712961e',
                        iso: 'EUR',
                        created: '2017-02-24T12:08:47.131Z',
                        sign: '€',
                        name: 'Euro',
                        country: 'Euro Member',
                        modified: '2017-02-24T12:08:47.131Z'
                    },
                    {
                        _id: '58b0224f6cb3d8231712961f',
                        iso: 'ILS',
                        created: '2017-02-24T12:08:47.131Z',
                        sign: '₪',
                        name: 'Shekel',
                        country: 'Israel',
                        modified: '2017-02-24T12:08:47.131Z'
                    }
                ];
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    }
                };

                updateProjectCurrenciesFinishedHandler(state, currencies);

                expect(state).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    }
                });
            });
        });

        describe('"updateProjectCurrenciesFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof updateProjectCurrenciesFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    }
                };

                newState = updateProjectCurrenciesFailedHandler(state, 'Some Error');

                expect(newState).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: 'Some Error'
                        },
                        data: {}
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    }
                };

                updateProjectCurrenciesFailedHandler(state, 'Some Error');

                expect(state).toEqual({
                    global: {
                        fetchState: {
                            fetched: false,
                            inProgress: false,
                            error: ''
                        },
                        data: {}
                    },
                    project: {
                        fetchState: {
                            fetched: false,
                            inProgress: true,
                            error: ''
                        },
                        data: {}
                    }
                });
            });
        });
    });
});
