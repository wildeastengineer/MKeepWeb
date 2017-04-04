// Libs
import request from 'superagent';
// App modules
import Repository from './Repository';
import { getErrorMessage } from './repositoryHelper';

class ProfileRepository extends Repository {
    getUrl(action) {
        switch (action) {
            case 'getProfile':
                return super.getUrl('profile');
            default:
                return null;
        }
    }

    getProfile() {
        return new Promise((resolve, reject) => {
            this.getUrl('getProfile')
                .then((url) => {
                    request
                        .get(url)
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            resolve({
                                id: response.body._id,
                                name: response.body.username,
                                projects: response.body.projects,
                                lang: response.body.lang
                            });
                        });
                });
        });
    }
}

export default new ProfileRepository;
