import {
    getProjectsListStartedHandler,
    getProjectsListFinishedHandler,
    getProjectsListFailedHandler,
    setCurrentProjectStartedHandler,
    setCurrentProjectFinishedHandler,
    setCurrentProjectFailedHandler,
    createProjectStartedHandler,
    createProjectFinishedHandler,
    createProjectFailedHandler
} from './reducerMethods';

describe('reducers', () => {
    describe('Projects', () => {
        describe('"getProjectsListStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getProjectsListStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                };

                newState = getProjectsListStartedHandler(state);

                expect(newState).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                };

                getProjectsListStartedHandler(state);

                expect(state).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                });
            });
        });

        describe('"getProjectsListFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getProjectsListFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                };
                let projectsList = [
                    {
                        _id: '000000000000000000000001',
                        name: 'Project #1'
                    },
                    {
                        _id: '000000000000000000000002',
                        name: 'Project #2'
                    }
                ];

                newState = getProjectsListFinishedHandler(state, projectsList);

                expect(newState).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001',
                            '000000000000000000000002'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            },
                            '000000000000000000000002': {
                                _id: '000000000000000000000002',
                                name: 'Project #2'
                            }
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                };
                let projectsList = [
                    {
                        _id: '000000000000000000000001',
                        name: 'Project #1'
                    },
                    {
                        _id: '000000000000000000000002',
                        name: 'Project #2'
                    }
                ];

                getProjectsListFinishedHandler(state, projectsList);

                expect(state).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                });
            });
        });

        describe('"getProjectsListFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getProjectsListFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                };
                let error = 'Some error';

                newState = getProjectsListFailedHandler(state, error);

                expect(newState).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: 'Some error'
                        },
                        ids: [],
                        data: {}
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                };
                let error = 'Some error';

                getProjectsListFailedHandler(state, error);

                expect(state).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [],
                        data: {}
                    }
                });
            });
        });

        describe('"setCurrentProjectStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof setCurrentProjectStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };

                newState = setCurrentProjectStartedHandler(state);

                expect(newState).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };

                setCurrentProjectStartedHandler(state);

                expect(state).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });
        });

        describe('"setCurrentProjectFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof setCurrentProjectFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };
                let projectData = {
                    _id: '000000000000000000000001',
                    name: 'Project #1',
                    created: '2017-06-14T04:53:31.948Z',
                    categories: [],
                    currencies: [],
                    accounts: [],
                    users: []
                };

                newState = setCurrentProjectFinishedHandler(state, projectData);

                expect(newState).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {
                            _id: '000000000000000000000001',
                            name: 'Project #1',
                            created: '2017-06-14T04:53:31.948Z',
                            categories: [],
                            currencies: [],
                            accounts: [],
                            users: []
                        }
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };
                let projectData = {
                    _id: '000000000000000000000001',
                    name: 'Project #1',
                    created: '2017-06-14T04:53:31.948Z',
                    categories: [],
                    currencies: [],
                    accounts: [],
                    users: []
                };

                setCurrentProjectFinishedHandler(state, projectData);

                expect(state).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });
        });

        describe('"setCurrentProjectFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof setCurrentProjectFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };
                let error = 'Some Error';

                newState = setCurrentProjectFailedHandler(state, error);

                expect(newState).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: 'Some Error'
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };
                let error = 'Some Error';

                setCurrentProjectFailedHandler(state, error);

                expect(state).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });
        });

        describe('"createProjectStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createProjectStartedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };

                newState = createProjectStartedHandler(state);

                expect(newState).toEqual({
                    currentProject: {
                        data: {},
                        fetchState: {
                            fetching: false,
                            error: null
                        }
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };

                createProjectStartedHandler(state);

                expect(state).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });
        });

        describe('"createProjectFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createProjectFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };
                let newProject = {
                    _id: '000000000000000000000002',
                    name: 'Project #2'
                };

                newState = createProjectFinishedHandler(state, newProject);

                expect(newState).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001',
                            '000000000000000000000002'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            },
                            '000000000000000000000002': {
                                _id: '000000000000000000000002',
                                name: 'Project #2'
                            }
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };
                let newProject = {
                    _id: '000000000000000000000002',
                    name: 'Project #2'
                };

                createProjectFinishedHandler(state, newProject);

                expect(state).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });
        });

        describe('"createProjectFailedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createProjectFailedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };
                let error = 'Some Error';

                newState = createProjectFailedHandler(state, error);

                expect(newState).toEqual({
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: false,
                            error: 'Some Error'
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });

            test('it should not mutate original state', () => {
                let state = {
                    currentProject: {
                        fetchState: {
                            fetching: false,
                            error: null
                        },
                        data: {}
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                };
                let error = 'Some Error';

                createProjectFailedHandler(state, error);

                expect(state).toEqual({
                    currentProject: {
                        data: {},
                        fetchState: {
                            fetching: false,
                            error: null
                        }
                    },
                    projectsList: {
                        fetchState: {
                            fetching: true,
                            error: null
                        },
                        ids: [
                            '000000000000000000000001'
                        ],
                        data: {
                            '000000000000000000000001': {
                                _id: '000000000000000000000001',
                                name: 'Project #1'
                            }
                        }
                    }
                });
            });
        });
    });
});
