import React from 'react';
import { IndexRoute, Route }  from 'react-router';

import App from 'components/app';
import CurrenciesPage from 'components/pages/Currencies';
import DashboardPage from 'components/pages/Dashboard';
import HomePage from 'components/pages/Home';

export default (
    <Route component={App} path='/'>
        <IndexRoute component={HomePage}/>
        <Route component={DashboardPage}    path='project'/>
        <Route component={CurrenciesPage}   path='project/currencies'/>
    </Route>
);