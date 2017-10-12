import {
    getCategoriesListStartedHandler,
    getCategoriesListFinishedHandler,
    getCategoriesListFailedHandler,
    createCategoryStartedHandler,
    createCategoryFinishedHandler,
    createCategoryFailedHandler,
    updateCategoryStartedHandler,
    updateCategoryFinishedHandler,
    updateCategoryFailedHandler,
    removeCategoryStartedHandler,
    removeCategoryFinishedHandler,
    removeCategoryFailedHandler
} from './reducerMethods';

describe('reducers', () => {
    describe('categoriesReducerMethods', () => {
        describe('"getCategoriesListStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getCategoriesListStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {},
                    expense: {}
                };

                newState = getCategoriesListStartedHandler(state);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {},
                    expense: {}
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {},
                    expense: {}
                };

                getCategoriesListStartedHandler(state);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {},
                    expense: {}
                });
            });
        });

        describe('"getCategoriesListFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getCategoriesListFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let categories = [
                    {
                        _id: '58b0224f6cb3d82317129001',
                        name: 'Food',
                        type: 'expense',
                        parent: null
                    },
                    {
                        _id: '58b0224f6cb3d82317129002',
                        name: 'Food at home',
                        type: 'expense',
                        parent: '58b0224f6cb3d82317129001'
                    },
                    {
                        _id: '58b0224f6cb3d82317129003',
                        name: 'Food at cafe',
                        type: 'expense',
                        parent: '58b0224f6cb3d82317129001'
                    },
                    {
                        _id: '58b0224f6cb3d82317129004',
                        name: 'Public service',
                        type: 'expense',
                        parent: null
                    },
                    {
                        _id: '58b0224f6cb3d82317129005',
                        name: 'Salary',
                        type: 'income',
                        parent: null
                    },
                    {
                        _id: '58b0224f6cb3d82317129006',
                        name: 'Passive income',
                        type: 'income',
                        parent: null
                    },
                    {
                        _id: '58b0224f6cb3d82317129007',
                        name: 'Interest on deposits',
                        type: 'income',
                        parent: '58b0224f6cb3d82317129006'
                    },
                    {
                        _id: '58b0224f6cb3d82317129008',
                        name: 'Investment',
                        type: 'income',
                        parent: '58b0224f6cb3d82317129006'
                    }
                ];
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {},
                    expense: {}
                };

                newState = getCategoriesListFinishedHandler(state, categories);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: {
                                _id: '58b0224f6cb3d82317129006',
                                name: 'Passive income',
                                type: 'income',
                                parent: null
                            }
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: {
                                _id: '58b0224f6cb3d82317129006',
                                name: 'Passive income',
                                type: 'income',
                                parent: null
                            }
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: {
                                _id: '58b0224f6cb3d82317129001',
                                name: 'Food',
                                type: 'expense',
                                parent: null
                            }
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: {
                                _id: '58b0224f6cb3d82317129001',
                                name: 'Food',
                                type: 'expense',
                                parent: null
                            }
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let categories = [
                    {
                        _id: '58b0224f6cb3d82317129001',
                        name: 'Food',
                        type: 'expense',
                        parent: null
                    },
                    {
                        _id: '58b0224f6cb3d82317129002',
                        name: 'Food at home',
                        type: 'expense',
                        parent: '58b0224f6cb3d82317129001'
                    },
                    {
                        _id: '58b0224f6cb3d82317129003',
                        name: 'Food at cafe',
                        type: 'expense',
                        parent: '58b0224f6cb3d82317129001'
                    },
                    {
                        _id: '58b0224f6cb3d82317129004',
                        name: 'Public service',
                        type: 'expense',
                        parent: null
                    },
                    {
                        _id: '58b0224f6cb3d82317129005',
                        name: 'Salary',
                        type: 'income',
                        parent: null
                    },
                    {
                        _id: '58b0224f6cb3d82317129006',
                        name: 'Passive income',
                        type: 'income',
                        parent: null
                    },
                    {
                        _id: '58b0224f6cb3d82317129007',
                        name: 'Interest on deposits',
                        type: 'income',
                        parent: '58b0224f6cb3d82317129006'
                    },
                    {
                        _id: '58b0224f6cb3d82317129008',
                        name: 'Investment',
                        type: 'income',
                        parent: '58b0224f6cb3d82317129006'
                    }
                ];
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {},
                    expense: {}
                };

                getCategoriesListFinishedHandler(state, categories);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {},
                    expense: {}
                });
            });
        });

        describe('"getCategoriesListFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getCategoriesListFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {},
                    expense: {}
                };

                newState = getCategoriesListFailedHandler(state, 'Some Error');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: 'Some Error'
                    },
                    income: {},
                    expense: {}
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {},
                    expense: {}
                };

                getCategoriesListFailedHandler(state, 'Some Error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {},
                    expense: {}
                });
            });
        });

        describe('"createCategoryStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createCategoryStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                newState = createCategoryStartedHandler(state);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                createCategoryStartedHandler(state);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });
        });

        describe('"createCategoryFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createCategoryFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };
                let newCategory = {
                    _id: '58b0224f6cb3d82317129100',
                    name: 'Gifts',
                    type: 'income',
                    parent: null
                };

                newState = createCategoryFinishedHandler(state, newCategory);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129100': {
                            _id: '58b0224f6cb3d82317129100',
                            name: 'Gifts',
                            type: 'income',
                            parent: null
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
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
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                createCategoryFinishedHandler(state, 'Some Error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });
        });

        describe('"createCategoryFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createCategoryFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                newState = createCategoryFailedHandler(state, 'Some error');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: 'Some error'
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
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
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                createCategoryFailedHandler(state, 'Some error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });
        });

        describe('"updateCategoryStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof updateCategoryStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                newState = updateCategoryStartedHandler(state);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                updateCategoryStartedHandler(state);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });
        });

        describe('"updateCategoryFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof updateCategoryFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: {
                                _id: '58b0224f6cb3d82317129006',
                                name: 'Passive income',
                                type: 'income',
                                parent: null
                            }
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: {
                                _id: '58b0224f6cb3d82317129006',
                                name: 'Passive income',
                                type: 'income',
                                parent: null
                            }
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: {
                                _id: '58b0224f6cb3d82317129001',
                                name: 'Food',
                                type: 'expense',
                                parent: null
                            }
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: {
                                _id: '58b0224f6cb3d82317129001',
                                name: 'Food',
                                type: 'expense',
                                parent: null
                            }
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };
                let editedCategory = {
                    _id: '58b0224f6cb3d82317129003',
                    name: 'Food at cafe and restaurants',
                    type: 'expense',
                    parent: '58b0224f6cb3d82317129001'
                };

                newState = updateCategoryFinishedHandler(state, editedCategory);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: {
                                _id: '58b0224f6cb3d82317129006',
                                name: 'Passive income',
                                type: 'income',
                                parent: null
                            }
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: {
                                _id: '58b0224f6cb3d82317129006',
                                name: 'Passive income',
                                type: 'income',
                                parent: null
                            }
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: {
                                _id: '58b0224f6cb3d82317129001',
                                name: 'Food',
                                type: 'expense',
                                parent: null
                            }
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe and restaurants',
                            type: 'expense',
                            parent: {
                                _id: '58b0224f6cb3d82317129001',
                                name: 'Food',
                                type: 'expense',
                                parent: null
                            }
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
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
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };
                let editedCategory = {
                    _id: '58b0224f6cb3d82317129004',
                    name: 'Public taxes',
                    type: 'expense',
                    parent: null
                };

                updateCategoryFinishedHandler(state, editedCategory);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });
        });

        describe('"updateCategoryFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof updateCategoryFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                newState = updateCategoryFailedHandler(state, 'Some error');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: 'Some error'
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
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
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                updateCategoryFailedHandler(state, 'Some error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });
        });

        describe('"removeCategoryStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof removeCategoryStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                newState = removeCategoryStartedHandler(state);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                removeCategoryStartedHandler(state);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });
        });

        describe('"removeCategoryFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof removeCategoryFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };
                let category = {
                    _id: '58b0224f6cb3d82317129007',
                    name: 'Interest on deposits',
                    type: 'income',
                    parent: '58b0224f6cb3d82317129006'
                };

                newState = removeCategoryFinishedHandler(state, category);

                expect(newState).toEqual({
                    fetchState: {
                        fetched: true,
                        inProgress: false,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
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
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };
                let category = {
                    _id: '58b0224f6cb3d82317129007',
                    name: 'Interest on deposits',
                    type: 'income',
                    parent: '58b0224f6cb3d82317129006'
                };

                removeCategoryFinishedHandler(state, category);

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });
        });

        describe('"removeCategoryFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof removeCategoryFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                newState = removeCategoryFailedHandler(state, 'Some error');

                expect(newState).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: false,
                        error: 'Some error'
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
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
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                };

                removeCategoryFailedHandler(state, 'Some error');

                expect(state).toEqual({
                    fetchState: {
                        fetched: false,
                        inProgress: true,
                        error: null
                    },
                    income: {
                        '58b0224f6cb3d82317129005': {
                            _id: '58b0224f6cb3d82317129005',
                            name: 'Salary',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129006': {
                            _id: '58b0224f6cb3d82317129006',
                            name: 'Passive income',
                            type: 'income',
                            parent: null
                        },
                        '58b0224f6cb3d82317129007': {
                            _id: '58b0224f6cb3d82317129007',
                            name: 'Interest on deposits',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        },
                        '58b0224f6cb3d82317129008': {
                            _id: '58b0224f6cb3d82317129008',
                            name: 'Investment',
                            type: 'income',
                            parent: '58b0224f6cb3d82317129006'
                        }
                    },
                    expense: {
                        '58b0224f6cb3d82317129001': {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Food',
                            type: 'expense',
                            parent: null
                        },
                        '58b0224f6cb3d82317129002': {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Food at home',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129003': {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Food at cafe',
                            type: 'expense',
                            parent: '58b0224f6cb3d82317129001'
                        },
                        '58b0224f6cb3d82317129004': {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Public service',
                            type: 'expense',
                            parent: null
                        }
                    }
                });
            });
        });
    });
});
