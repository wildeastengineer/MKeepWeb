import {
    getAccountListStartedHandler,
    getAccountListFinishedHandler,
    getAccountListFailedHandler,
    createAccountStartedHandler,
    createAccountFinishedHandler,
    createAccountFailedHandler,
    updateAccountStartedHandler,
    updateAccountFinishedHandler,
    updateAccountFailedHandler,
    removeAccountStartedHandler,
    removeAccountFinishedHandler,
    removeAccountFailedHandler
} from './reducerMethods';

describe('reducers', () => {
    describe('accountsReducerMethods', () => {
        describe('"getAccountListStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getAccountListStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    data: {}
                };

                newState = getAccountListStartedHandler(state);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {}
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    data: {}
                };

                getAccountListStartedHandler(state);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    data: {}
                });
            });
        });

        describe('"getAccountListFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getAccountListFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let accounts = [
                    {
                        _id: '58b0224f6cb3d82317129001',
                        name: 'Wallet',
                        initValue: 0,
                        value: 500,
                        currency: '58b0224f6cb3d82317129619'
                    },
                    {
                        _id: '58b0224f6cb3d82317129002',
                        name: 'Bank Account 1',
                        initValue: 30000,
                        value: 100000,
                        currency: '58b0224f6cb3d82317129618'
                    },
                    {
                        _id: '58b0224f6cb3d82317129003',
                        name: 'Bank Account 2',
                        initValue: 10000,
                        value: 50000,
                        currency: '58b0224f6cb3d82317129618'
                    },
                    {
                        _id: '58b0224f6cb3d82317129004',
                        name: 'Broker Account',
                        initValue: 0,
                        value: 345.15,
                        currency: '58b0224f6cb3d82317129619'
                    }
                ];
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {}
                };

                newState = getAccountListFinishedHandler(state, accounts);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let accounts = [
                    {
                        _id: '58b0224f6cb3d82317129001',
                        name: 'Wallet'
                    },
                    {
                        _id: '58b0224f6cb3d82317129002',
                        name: 'Bank Account 1'
                    },
                    {
                        _id: '58b0224f6cb3d82317129003',
                        name: 'Bank Account 2'
                    },
                    {
                        _id: '58b0224f6cb3d82317129004',
                        name: 'Broker Account'
                    }
                ];
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {}
                };

                getAccountListFinishedHandler(state, accounts);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {}
                });
            });
        });

        describe('"getAccountListFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getAccountListFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {}
                };

                newState = getAccountListFailedHandler(state, 'Some Error');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: 'Some Error'
                    },
                    data: {}
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {}
                };

                getAccountListFailedHandler(state, 'Some Error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {}
                });
            });
        });

        describe('"createAccountStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createAccountStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                newState = createAccountStartedHandler(state);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };
                let newAccount = {
                    _id: '58b0224f6cb3d82317129005',
                    name: 'Mutual Fund',
                    initValue: 20000,
                    value: 20000,
                    currency: '58b0224f6cb3d82317129619'
                };

                createAccountStartedHandler(state, newAccount);

                expect(state).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });
        });

        describe('"createAccountFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createAccountFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };
                let newAccount = {
                    _id: '58b0224f6cb3d82317129005',
                    name: 'Mutual Fund',
                    initValue: 20000,
                    value: 20000,
                    currency: '58b0224f6cb3d82317129619'
                };

                newState = createAccountFinishedHandler(state, newAccount);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Mutual Fund',
                            initValue: 20000,
                            value: 20000,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };
                let newAccount = {
                    _id: '58b0224f6cb3d82317129005',
                    name: 'Mutual Fund',
                    initValue: 20000,
                    value: 20000,
                    currency: '58b0224f6cb3d82317129619'
                };

                createAccountFinishedHandler(state, newAccount);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });
        });

        describe('"createAccountFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createAccountFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                newState = createAccountFailedHandler(state, 'Some Error');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: 'Some Error'
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                createAccountFailedHandler(state, 'Some Error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });
        });

        describe('"updateAccountStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof updateAccountStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                newState = updateAccountStartedHandler(state);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                updateAccountStartedHandler(state);

                expect(state).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });
        });

        describe('"updateAccountFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof updateAccountFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };
                let updatedAccount = {
                    _id: '58b0224f6cb3d82317129002',
                    name: 'Bank Account Alpha',
                    initValue: 30000,
                    value: 200000,
                    currency: '58b0224f6cb3d82317129618'
                };

                newState = updateAccountFinishedHandler(state, updatedAccount);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account Alpha',
                            initValue: 30000,
                            value: 200000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };
                let updatedAccount = {
                    _id: '58b0224f6cb3d82317129002',
                    name: 'Bank Account Alpha',
                    initValue: 30000,
                    value: 200000,
                    currency: '58b0224f6cb3d82317129618'
                };

                updateAccountFinishedHandler(state, updatedAccount);

                expect(state).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });
        });

        describe('"updateAccountFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof updateAccountFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                newState = updateAccountFailedHandler(state, 'Some error');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: 'Some error'
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                updateAccountFailedHandler(state, 'Some error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });
        });

        describe('"removeAccountStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof removeAccountStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                newState = removeAccountStartedHandler(state);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                removeAccountStartedHandler(state);

                expect(state).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });
        });

        describe('"removeAccountFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof removeAccountFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };
                let removedAccount = {
                    _id: '58b0224f6cb3d82317129003',
                    name: 'Bank Account 2',
                    initValue: 10000,
                    value: 50000,
                    currency: '58b0224f6cb3d82317129618'
                };

                newState = removeAccountFinishedHandler(state, removedAccount);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };
                let removedAccount = {
                    _id: '58b0224f6cb3d82317129003',
                    name: 'Bank Account 2',
                    initValue: 10000,
                    value: 50000,
                    currency: '58b0224f6cb3d82317129618'
                };

                removeAccountFinishedHandler(state, removedAccount);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });
        });

        describe('"removeAccountFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof removeAccountFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                newState = removeAccountFailedHandler(state, 'Some Error');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: 'Some Error'
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                };

                removeAccountFailedHandler(state, 'Some Error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    data: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            initValue: 0,
                            value: 500,
                            currency: '58b0224f6cb3d82317129619'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1',
                            initValue: 30000,
                            value: 100000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2',
                            initValue: 10000,
                            value: 50000,
                            currency: '58b0224f6cb3d82317129618'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account',
                            initValue: 0,
                            value: 345.15,
                            currency: '58b0224f6cb3d82317129619'
                        }
                    }
                });
            });
        });
    });
});
