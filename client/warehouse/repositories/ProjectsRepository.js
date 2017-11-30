//ProjectsRepository.js

// Libs
import request from 'superagent';
// App modules
import Repository from './Repository';
import { getErrorMessage } from '../helpers/repositoryHelper';

class ProjectsRepository extends Repository {
    getUrl(action, id) {
        switch (action) {
            case 'create':
                return super.getUrl('projects');
            case 'getById':
                return super.getUrl(`projects/${id}`);
            default:
                return null;
        }
    }

    create(project) {
        return new Promise((resolve, reject) => {
            this.getUrl('create')
                .then((url) => {
                    request
                        .post(url)
                        .send(project)
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

    getById(projectId) {
        return new Promise((resolve, reject) => {
            this.getUrl('getById', projectId)
                .then((url) => {
                    request
                        .get(url)
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

export default ProjectsRepository;
