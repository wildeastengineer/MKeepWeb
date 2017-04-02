// App modules
import authRepository from './AuthRepository';
// Config
import config from '../config';

class Repository {
    constructor() {
        this.protocol = config.api.protocol;
        this.apiUrl = config.api.url;
    }

    getUrl(endPoint) {
        return new Promise((resolve, reject) => {
            authRepository.getAccessToken()
                .then((accessToken) => {
                    const apiUrl = `${this.protocol}://${this.apiUrl}/`;

                    resolve(`${apiUrl}/${endPoint}?access_token=${accessToken}`);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default Repository;
