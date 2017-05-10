import React from 'react';
import { IndexRoute, Route }  from 'react-router';

import { requireAuthentication } from 'components/auth';
import App from 'components/app';
import CurrenciesPage from 'components/pages/Currencies';
import DashboardPage from 'components/pages/Dashboard';
import HomePage from 'components/pages/Home';
import LogOutPage from 'components/pages/LogOut';

export default (
    <Route component={App} path='/'>
        <IndexRoute component={HomePage}/>
        <Route path='project'               component={requireAuthentication(DashboardPage)}/>
        <Route path='project/currencies'    component={requireAuthentication(CurrenciesPage)}/>
        <Route path='logOut'                component={LogOutPage}/>
</Route>
);
