import {getErrorMessage} from './repositoryHelper';

describe('repositories', () => {
    describe('repositoryHelper', () => {
        describe('"getErrorMessage" method', () => {
            test('it should be defined', () => {
                expect(typeof getErrorMessage).toBe('function');
            });

            test('it should return correct massage for new account creation fail', () => {
                const response = {
                    status: 400,
                    text: 'User with this email already exist',
                    error: {
                        message: 'cannot POST http://localhost:8080/api/registration (400)',
                        method: 'POST',
                        status: 400,
                        url: 'http://localhost:8080/api/registration'
                    }
                };
                const error = {
                    message: 'Bad Request',
                    response
                };

                const errorMessage = getErrorMessage(error, response);

                expect(errorMessage).toBe('User with this email already exist');
            });

            test('it should return correct massage for log in with incorrect credentials', () => {
                const response = {
                    status: 403,
                    statusCode: 403,
                    statusText: 'Forbidden',
                    text: '{"error":"invalid_grant","error_description":"Invalid resource owner credentials"}',
                    error: {
                        status: 403,
                        method: 'POST',
                        url: 'http://localhost:8080/api/authenticate',
                        message: 'cannot POST http://localhost:8080/api/authenticate (403)'
                    }
                };
                const error = {
                    message: 'Forbidden',
                    response
                };

                const errorMessage = getErrorMessage(error, response);

                expect(errorMessage).toBe('Invalid resource owner credentials');
            });
        });
    });
});
