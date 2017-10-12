import {
    getAccountListStartedHandler,
    getAccountListFinishedHandler,
    getAccountListFailedHandler
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

            test('it should return correct new state', () => {ons
                let newState;
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
                            name: 'Wallet'
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank Account 1'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank Account 2'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker Account'
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
    });
});
