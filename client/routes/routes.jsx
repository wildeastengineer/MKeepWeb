import React from 'react';
import { IndexRoute, Route }  from 'react-router';

import paths from './paths';
import { isAuthenticated } from 'utils/auth';

import App from 'components/app';
import CurrenciesPage from 'components/pages/Currencies';
import Dashboard from 'components/pages/Dashboard';
import HomePage from 'components/pages/Home';
import LogOutPage from 'components/pages/LogOut';
import ProjectsList from 'components/pages/ProjectsList';
import { Page404 } from 'components/pages/ErrorPages'

export default function getRoutes(store) {
    function onEnter(nextState, replace) {
        const { getState } = store;

        if (!isAuthenticated(getState())) {
            replace(`/?redirect=${nextState.location.pathname}`);
        }
    }

    return (
        <Route component={App} path='/'>
            <IndexRoute                             component={HomePage}/>
            <Route path={paths.logout}              component={LogOutPage}/>
            <Route path={paths.project.list}        component={ProjectsList}    onEnter={onEnter} />
            <Route path={paths.project.dashboard}   component={Dashboard}       onEnter={onEnter} />
            <Route path={paths.project.currencies}  component={CurrenciesPage}  onEnter={onEnter}/>
            <Route path='*'                         component={Page404}/>
        </Route>
    );
}
