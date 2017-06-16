import {
    createNewProjectStartedHandler,
    getProjectsListFinishedHandler
} from './reducerMethods';

describe('reducers', () => {
    describe('Projects', () => {
        describe('"createNewProjectStartedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof createNewProjectStartedHandler).toBe('function');
            });
        });

        describe('"getProjectsListFinishedHandler" method', () => {
            test('it should be defined', () => {
                expect(typeof getProjectsListFinishedHandler).toBe('function');
            });

            test('it should return correct new state', () => {
                let newState;
                let projectsList = [
                    {
                        _id: '0001',
                        name: 'Project 1'
                    },
                    {
                        _id: '0002',
                        name: 'Project 2'
                    }
                ];
                let state = {
                    currentProject: null,
                    projectsList: []
                };

                newState = getProjectsListFinishedHandler(state, projectsList);

                expect(newState).toEqual({
                    currentProject: null,
                    projectsList: [
                        {
                            _id: '0001',
                            name: 'Project 1'
                        },
                        {
                            _id: '0002',
                            name: 'Project 2'
                        }
                    ]
                });
            });

            test('it should not mutate original state', () => {
                let projectsList = [
                    {
                        _id: '0001',
                        name: 'Project 1'
                    },
                    {
                        _id: '0002',
                        name: 'Project 2'
                    }
                ];
                let state = {
                    currentProject: null,
                    projectsList: []
                };

                getProjectsListFinishedHandler(state, projectsList);

                expect(state).toEqual({
                    currentProject: null,
                    projectsList: []
                });
            });
        });
    });
});
