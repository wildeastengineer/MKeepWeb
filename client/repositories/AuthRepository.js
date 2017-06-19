// Libs
import request from 'superagent';
import Cookie from './cookie';
// App modules
import {tokens} from 'dictionaries';
import config from 'config';
import { getErrorMessage } from './repositoryHelper';

const { clientId, clientSecret } = config.auth;

class AuthRepository {
    constructor(params = {
                    type: 'client'
                }) {
        this.cookie = new Cookie(params);
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

    refreshTokens() {
        return new Promise((resolve, reject) => {
            const refreshToken = this.getRefreshToken();

            if (!refreshToken) {
                return reject('Refresh token is not defined');
            }

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
                        tokenMaxAge: response.body.expires_in * 1000,
                        userProfile: response.body.userProfile
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
            const accessToken = this.cookie.load(tokens.accessToken);

            if (accessToken) {
                return resolve(accessToken);
            }

            reject('Access token is not defined');
        });
    }

    getRefreshToken() {
        return this.cookie.load(tokens.refreshToken);
    }

    saveAccessToken(token, maxAge) {
        this.cookie.save(tokens.accessToken, token, {
            maxAge
        });
    }

    saveRefreshToken(token, maxAge) {
        this.cookie.save(tokens.refreshToken, token, {
            maxAge
        });
    }

    removeAccessToken() {
        this.cookie.remove(tokens.accessToken);
    }

    removeRefreshToken() {
        this.cookie.remove(tokens.refreshToken);
    }
}

export default AuthRepository;
