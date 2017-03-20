import React from 'react';
import { IndexRoute, Route }  from 'react-router';

import App from 'App';
import CurrenciesPage from 'components/pages/Currencies';
import DashboardPage from 'components/pages/Dashboard';

export default (
    <Route component={App} path='/'>
        <IndexRoute component={DashboardPage}/>
        <Route component={DashboardPage}    path='project/:projectId'/>
        <Route component={CurrenciesPage}   path='project/:projectId/currencies'/>
    </Route>
);