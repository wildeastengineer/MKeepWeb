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
            case 'mainCurrency':
                return super.getUrl(`projects/${id}/currencies/main`);
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

    updateMainCurrency(projectId, currencyId) {
        return new Promise((resolve, reject) => {
            this.getUrl('mainCurrency', projectId)
                .then((url) => {
                    request
                        .patch(url)
                        .send({
                            mainCurrency: currencyId
                        })
                        .set('Accept', 'application/json')
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            const newMainCurrency = response.body;

                            resolve(newMainCurrency);
                        });
                });
        });
    }
}

export default CurrenciesRepository;
