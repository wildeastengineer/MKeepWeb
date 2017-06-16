//ProjectsRepository.js

// Libs
import request from 'superagent';
// App modules
import Repository from './Repository';
import { getErrorMessage } from './repositoryHelper';

class ProjectsRepository extends Repository {
    getUrl(action) {
        switch (action) {
            case 'create':
                return super.getUrl('projects');
            default:
                return null;
        }
    }

    createNew(projectPrams) {
        return new Promise((resolve, reject) => {
            this.getUrl('create')
                .then((url) => {
                    request
                        .post(url)
                        .send(projectPrams)
                        .set('Accept', 'application/json')
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            const project = response.body;

                            resolve(project);
                        });
                });
        });
    }
}

export default new ProjectsRepository;
