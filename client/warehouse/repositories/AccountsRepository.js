// Libs
//import request from 'superagent';
// App modules
import Repository from './Repository';
//import { getErrorMessage } from '../helpers/repositoryHelper';

class CurrenciesRepository extends Repository {
    getUrl(action) {
        switch (action) {
            case 'accountsList':
                return super.getUrl('accounts');
            default:
                return null;
        }
    }

    getList() {
        return new Promise((resolve) => {
            this.getUrl('accountsList')
                .then((/*url*/) => {
                    resolve([
                        {
                            _id: '58b0224f6cb3d82317129001',
                            name: 'Wallet',
                            value: 5345.55,
                            initValue: 0,
                            currency: {
                                _id: '58b0224f6cb3d8231712962b',
                                iso: 'RUB',
                                created: '2017-02-24T12:08:47.131Z',
                                sign: '₽',
                                name: 'Ruble',
                                country: 'Russia',
                                modified: '2017-02-24T12:08:47.131Z'
                            }
                        },
                        {
                            _id: '58b0224f6cb3d82317129002',
                            name: 'Bank account',
                            value: 1200500.0,
                            initValue: 0,
                            currency: {
                                _id: '58b0224f6cb3d8231712962b',
                                iso: 'RUB',
                                created: '2017-02-24T12:08:47.131Z',
                                sign: '₽',
                                name: 'Ruble',
                                country: 'Russia',
                                modified: '2017-02-24T12:08:47.131Z'
                            }
                        },
                        {
                            _id: '58b0224f6cb3d82317129003',
                            name: 'Bank account 2',
                            value: 2500.63,
                            initValue: 0,
                            currency: {
                                _id: '58b0224f6cb3d8231712961e',
                                iso: 'EUR',
                                created: '2017-02-24T12:08:47.131Z',
                                sign: '€',
                                name: 'Euro',
                                country: 'Euro Member',
                                modified: '2017-02-24T12:08:47.131Z'
                            }
                        },
                        {
                            _id: '58b0224f6cb3d82317129004',
                            name: 'Broker account',
                            value: 100023.05,
                            initValue: 0,
                            currency: {
                                _id: '58b0224f6cb3d8231712962b',
                                iso: 'RUB',
                                created: '2017-02-24T12:08:47.131Z',
                                sign: '₽',
                                name: 'Ruble',
                                country: 'Russia',
                                modified: '2017-02-24T12:08:47.131Z'
                            }
                        }
                    ]);

                    // request
                    //     .get(url)
                    //     .end((error, response) => {
                    //         Temp stub
                    //
                    //         if (error) {
                    //             return reject(getErrorMessage(error, response));
                    //         }
                    //
                    //         resolve(response.body);
                    //     });
                });
        });
    }
}

export default CurrenciesRepository;
