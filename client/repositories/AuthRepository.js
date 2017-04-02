// Libs
import request from 'superagent';
import cookie from 'react-cookie';
// App modules
import config from '../config';
import { getErrorMessage } from './repositoryHelper';

const { clientId, clientSecret } = config.auth;

class AuthRepository {
    getUrl(action) {
        const { protocol, url } = config.api;
        const apiUrl = `${protocol}://${url}`;

        switch (action) {
            case 'logIn':
                return `${apiUrl}/authenticate`;
            case 'createAccount':
                return `${apiUrl}/registration`;
            default:
                return null;
        }
    }

    logInByEmail(email, password) {
        return new Promise((resolve, reject) => {
            request
                .post(this.getUrl('logIn'))
                .send({
                    'grant_type': 'password',
                    'client_id': clientId,
                    'client_secret': clientSecret,
                    'username': email,
                    password
                })
                .set('Accept', 'application/json')
                .end((error, response) => {
                    if (error) {
                        return reject(getErrorMessage(error, response));
                    }

                    const tokenMaxAge = response.body.expires_in;

                    cookie.save('accessToken', response.body.access_token, {
                        maxAge: tokenMaxAge
                    });

                    cookie.save('refreshToken', response.body.refresh_token, {
                        maxAge: tokenMaxAge
                    });

                    resolve(response.body);
                });
        });
    }

    refreshTokens(refreshToken) {
        return new Promise((resolve, reject) => {
            request
                .post(this.getUrl('logIn'))
                .send({
                    'grant_type': 'refresh_token',
                    'client_id': clientId,
                    'client_secret': clientSecret,
                    'refresh_token': refreshToken
                })
                .end((error, response) => {
                    if (error) {
                        return reject(getErrorMessage(error, response));
                    }

                    const data = {
                        accessToken: response.body.access_token,
                        refreshToken: response.body.refresh_token,
                        tokenMaxAge: response.body.expires_in * 1000
                    };

                    cookie.save('accessToken', data.accessToken, {
                        maxAge: data.tokenMaxAge
                    });

                    cookie.save('refreshToken', data.refreshToken, {
                        maxAge: data.tokenMaxAge
                    });

                    resolve(data);
                });
        });
    }

    createNewAccount(email, password) {
        return new Promise((resolve, reject) => {
            request
                .post(this.getUrl('createAccount'))
                .send({
                    'username': email,
                    password
                })
                .set('Accept', 'application/json')
                .end((error, response) => {
                    if (error) {
                        return reject(getErrorMessage(error, response));
                    }

                    resolve(response.body);
                });
        });
    }

    getAccessToken() {
        return new Promise((resolve) => {
            const accessToken = cookie.load('accessToken');

            resolve(accessToken);
        });
    }
}

export default new AuthRepository();
