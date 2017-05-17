import React from 'react';
import { IndexRoute, Route }  from 'react-router';

import { isAuthenticated } from 'utils/auth';

import App from 'components/app';
import CurrenciesPage from 'components/pages/Currencies';
import DashboardPage from 'components/pages/Dashboard';
import HomePage from 'components/pages/Home';
import LogOutPage from 'components/pages/LogOut';

export default function (store) {
    function onEnter(nextState, replace) {
        const { getState } = store;

        if (!isAuthenticated(getState())) {
            replace(`/?redirect=${nextState.location.pathname}`);
        }
    }

    return (
        <Route component={App} path='/'>
                <IndexRoute component={HomePage}/>
                <Route path='logOut' component={LogOutPage}/>
                <Route path='project' component={DashboardPage} onEnter={onEnter}/>
                <Route path='project/currencies' component={CurrenciesPage} onEnter={onEnter}/>
        </Route>
    );
};
