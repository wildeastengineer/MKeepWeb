import React from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import Store from './store';
import { logInByCookies } from 'store/auth/actions';
import { getRoutes } from './routes';
import { CookiesProvider, Cookies } from './warehouse';

const renderApp = (req, res) => {
    const cookies = new Cookies(req, res);
    const location = req.url;
    const store = Store();
    const routes = getRoutes(store);

    return new Promise((resolve, reject) => {
        store.dispatch(logInByCookies(cookies))
            .then(() => {
                match({
                    routes,
                    location
                }, (error, redirectLocation, renderProps) => {
                    if (redirectLocation) { // Если необходимо сделать redirect
                        return reject({
                            status: 301,
                            location: redirectLocation.pathname + redirectLocation.search
                        });
                    }

                    if (error) {
                        return reject({
                            status: 500,
                            message: error.message
                        });
                    }

                    if (!renderProps) {
                        return reject({
                            status: 404,
                            message: 'Not found'
                        });
                    }

                    resolve({
                        renderedApp: ReactDom.renderToString(
                            <Provider store={store}>
                                <CookiesProvider cookies={cookies}>
                                    <RouterContext {...renderProps} />
                                </CookiesProvider>
                            </Provider>
                        ),
                        state: store.getState()
                    });
                });
            });
    });
};

export default renderApp;
