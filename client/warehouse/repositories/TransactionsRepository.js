// Libs
import request from 'superagent';
// App modules
import Repository from './Repository';
import { getErrorMessage } from '../helpers/repositoryHelper';

class CurrenciesRepository extends Repository {
    getUrl(action, projectId, transactionId) {
        switch (action) {
            case 'list':
                return super.getUrl(`projects/${projectId}/transactions`);
            case 'create':
                return super.getUrl(`projects/${projectId}/transactions`);
            case 'update':
                return super.getUrl(`projects/${projectId}/transactions/${transactionId}`);
            case 'remove':
                return super.getUrl(`projects/${projectId}/transactions/${transactionId}`);
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

    create(projectId, transaction) {
        return new Promise((resolve, reject) => {
            this.getUrl('create', projectId)
                .then((url) => {
                    request
                        .put(url)
                        .send(transaction)
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

    update(projectId, transactionId, transactionData) {
        return new Promise((resolve, reject) => {
            this.getUrl('update', projectId, transactionId)
                .then((url) => {
                    request
                        .patch(url)
                        .send(transactionData)
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

    remove(projectId, transactionId) {
        return new Promise((resolve, reject) => {
            this.getUrl('remove', projectId, transactionId)
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
