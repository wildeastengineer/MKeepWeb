// Libs
import request from 'superagent';
// App modules
import Repository from './Repository';
import { getErrorMessage } from '../helpers/repositoryHelper';

class CurrenciesRepository extends Repository {
    getUrl(action, id) {
        switch (action) {
            case 'globalCurrencies':
                return super.getUrl('currencies');
            case 'projectCurrencies':
                return super.getUrl(`projects/${id}/currencies`);
            default:
                return null;
        }
    }

    getGlobal() {
        return new Promise((resolve, reject) => {
            this.getUrl('globalCurrencies')
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

    updateProjectCurrencies(projectId, currencies) {
        return new Promise((resolve, reject) => {
            this.getUrl('projectCurrencies', projectId)
                .then((url) => {
                    request
                        .patch(url)
                        .send({
                            currencies
                        })
                        .set('Accept', 'application/json')
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            const updatedCurrencies = response.body;

                            resolve(updatedCurrencies);
                        });
                });
        });
    }
}

export default CurrenciesRepository;
