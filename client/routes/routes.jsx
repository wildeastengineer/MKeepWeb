import React from 'react';
import { IndexRoute, Route }  from 'react-router';

import paths from './paths';
import { isAuthenticated } from 'utils/auth';

import App from 'components/app';

import HomePage     from 'components/pages/Home';
import LogOutPage   from 'components/pages/LogOut';

import ProjectsList         from 'components/pages/ProjectsList';
import Dashboard            from 'components/pages/Dashboard';
import Project              from 'components/pages/Project';
import ProjectSettingsPage  from 'components/pages/ProjectSettings';
import AccountsPage         from 'components/pages/ProjectSettings/Accounts';
import CategoriesPage       from 'components/pages/ProjectSettings/Categories';
import CurrenciesPage       from 'components/pages/ProjectSettings/Currencies';

import { Page404 } from 'components/pages/ErrorPages'

export default function getRoutes(store) {
    function onEnter(nextState, replace) {
        const { getState } = store;
        const authenticated = isAuthenticated(getState());

        if (!authenticated) {
            replace(`/?redirect=${nextState.location.pathname}`);
        }
    }

    return (
        <Route component={App} path={paths.home.url}>
            <IndexRoute
                component={HomePage}
            />
            <Route
                path={paths.logout.url}
                component={LogOutPage}
            />
            <Route
                path={paths.projects.url}
                component={ProjectsList}
                onEnter={onEnter}
            />
            <Route
                path={paths.project.url}
                component={Project}
            >
                <IndexRoute
                    component={Dashboard}
                    onEnter={onEnter}
                />
                <Route
                    path={paths.project.settings.url}
                    component={ProjectSettingsPage}
                    onEnter={onEnter}>
                    <Route
                        path={paths.project.settings.accounts.url}
                        component={AccountsPage}
                        onEnter={onEnter}
                    />
                    <Route
                        path={paths.project.settings.categories.url}
                        component={CategoriesPage}
                        onEnter={onEnter}
                    />
                    <Route
                        path={paths.project.settings.currencies.url}
                        component={CurrenciesPage}
                        onEnter={onEnter}
                    />
                </Route>
            </Route>
            <Route
                path='*'
                component={Page404}
            />
        </Route>
    );
}
