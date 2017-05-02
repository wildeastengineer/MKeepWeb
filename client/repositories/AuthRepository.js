// Libs
import request from 'superagent';
import cookie from 'react-cookie';
// App modules
import config from '../config';
import { getErrorMessage } from './repositoryHelper';

const { clientId, clientSecret } = config.auth;

class AuthRepository {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
    }

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

                    const data = {
                        accessToken: response.body.access_token,
                        refreshToken: response.body.refresh_token,
                        tokenMaxAge: response.body.expires_in * 1000,
                        userProfile: response.body.userProfile
                    };

                    this.saveAccessToken(data.accessToken, data.tokenMaxAge);
                    this.saveRefreshToken(data.refreshToken, data.tokenMaxAge);

                    resolve(data);
                });
        });
    }

    logOut() {
        this.removeAccessToken();
        this.removeRefreshToken();
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

                    this.saveAccessToken(data.accessToken, data.tokenMaxAge);
                    this.saveRefreshToken(data.refreshToken, data.tokenMaxAge);

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

                    resolve({
                        name: response.body.username,
                        created: response.body.created
                    });
                });
        });
    }

    getAccessToken() {
        return new Promise((resolve, reject) => {
            if (this.accessToken) {
                return resolve(this.accessToken);
            }

            if (cookie.load('accessToken')) {
                return resolve(cookie.load('accessToken'));
            }

            reject('Access token is not defined');
        });
    }

    saveAccessToken(token, maxAge) {
        this.accessToken = token;
        cookie.save('accessToken', token, {
            maxAge
        });
    }

    saveRefreshToken(token, maxAge) {
        this.refreshToken = token;
        cookie.save('refreshToken', token, {
            maxAge
        });
    }

    removeAccessToken() {
        this.accessToken = null;
        cookie.remove('accessToken');
    }

    removeRefreshToken() {
        this.refreshToken = null;
        cookie.remove('refreshToken');
    }
}

export default new AuthRepository();
