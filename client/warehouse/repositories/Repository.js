// App modules
import AuthRepository from './AuthRepository';
// Config
import config from 'config';

class Repository {
    constructor(cookies) {
        this.protocol = config.api.protocol;
        this.apiUrl = config.api.url;
        this.authRepository = new AuthRepository(cookies);
    }

    getUrl(endPoint) {
        return new Promise((resolve, reject) => {
            this.authRepository.getAccessToken()
                .then((accessToken) => {
                    const apiUrl = `${this.protocol}://${this.apiUrl}`;

                    resolve(`${apiUrl}/${endPoint}?access_token=${accessToken}`);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default Repository;
