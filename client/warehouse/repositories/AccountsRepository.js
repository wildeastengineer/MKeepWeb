// Libs
import request from 'superagent';
// App modules
import Repository from './Repository';
import { getErrorMessage } from '../helpers/repositoryHelper';

class CurrenciesRepository extends Repository {
    getUrl(action, projectId, accountId) {
        switch (action) {
            case 'list':
                return super.getUrl(`projects/${projectId}/accounts`);
            case 'create':
                return super.getUrl(`projects/${projectId}/accounts`);
            case 'update':
                return super.getUrl(`projects/${projectId}/accounts/${accountId}`);
            case 'remove':
                return super.getUrl(`projects/${projectId}/accounts/${accountId}`);
            default:
                return null;
        }
    }

    getList(projectId) {
        return new Promise((resolve, reject) => {
            this.getUrl('list', projectId)
                .then((url) => {
                    request
                        .get(url)
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            resolve(response.body);
                        });
                });
        });
    }

    create(projectId, account) {
        return new Promise((resolve, reject) => {
            this.getUrl('create', projectId)
                .then((url) => {
                    request
                        .put(url)
                        .send(account)
                        .set('Accept', 'application/json')
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            const account = response.body;

                            resolve(account);
                        });
                });
        });
    }

    update(projectId, accountId, accountData) {
        return new Promise((resolve, reject) => {
            this.getUrl('update', projectId, accountId)
                .then((url) => {
                    request
                        .patch(url)
                        .send(accountData)
                        .set('Accept', 'application/json')
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            const account = response.body;

                            resolve(account);
                        });
                });
        });
    }

    remove(projectId, accountId) {
        return new Promise((resolve, reject) => {
            this.getUrl('remove', projectId, accountId)
                .then((url) => {
                    request
                        .delete(url)
                        .set('Accept', 'application/json')
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            resolve(response.body);
                        });
                });
        });
    }
}

export default CurrenciesRepository;
