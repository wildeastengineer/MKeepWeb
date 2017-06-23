// Libs
import request from 'superagent';
import Cookie from './cookie';
// App modules
import {tokens} from 'dictionaries';
import config from 'config';
import getLogger from 'logger';
import { getErrorMessage } from './repositoryHelper';

const logger = getLogger('Auth Repository');

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
            logger.trace('Log in by email started');

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

                    logger.trace('Log in by email finished');
                    logger.trace(`New refresh token: ${data.refreshToken}`);
                    logger.trace(`New access token: ${data.accessToken}`);

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
            logger.trace('Refresh tokens started');

            const refreshToken = this.getRefreshToken();

            logger.trace(`refresh token: ${refreshToken}`);

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
                        logger.trace('Refresh tokens request failed');

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

                    logger.trace('Refresh tokens request finished');
                    logger.trace(`New refresh token: ${data.refreshToken}`);
                    logger.trace(`New access token: ${data.accessToken}`);

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
