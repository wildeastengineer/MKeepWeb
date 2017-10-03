import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import accountsReducer from './accounts/reducer';
import authReducer from './auth/reducer';
import currenciesReducer from './currencies/reducer';
import profileReducer from './profile/reducer';
import projectsReducer from './projects/reducer';

export default combineReducers({
    routing: routerReducer,
    accounts: accountsReducer,
    currencies: currenciesReducer,
    profile: profileReducer,
    projects: projectsReducer,
    user: authReducer
});
