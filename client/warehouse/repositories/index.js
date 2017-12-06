import config from './config';

import AccountsRepository from './AccountsRepository';
import AuthRepository from './AuthRepository';
import CategoriesRepository from './CategoriesRepository';
import CurrenciesRepository from './CurrenciesRepository';
import ProfileRepository from './ProfileRepository';
import ProjectsRepository from './ProjectsRepository';
import TransactionsOriginRepository from './TransactionsRepository';
import TransactionsFakeRepository from './TransactionsFakeRepository';

const TransactionsRepository = config.transactions.use === 'fake' ?
    TransactionsFakeRepository :
    TransactionsOriginRepository;

export {
    AccountsRepository,
    AuthRepository,
    CategoriesRepository,
    CurrenciesRepository,
    ProfileRepository,
    ProjectsRepository,
    TransactionsRepository
};
