import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth/reducer';
import projectsReducer from './projects/reducer';

export default combineReducers({
    routing: routerReducer,
    user: authReducer,
    projects: projectsReducer
});
