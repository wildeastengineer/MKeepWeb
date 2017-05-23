import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';

import React    from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Store from 'store';
import { getRoutes } from '../client/routes';
import { logInByCookie } from '../client/store/actions/authActions';

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

process.env.BROWSER = false;

app.set('views', path.join(__dirname, '/templates/'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use((req, res, next) => {
    const store = Store();

    store.dispatch(logInByCookie(req, res))
        .catch((error) => {
            console.log('Log in by Cookie error:', error);
            return Promise.resolve();
        })
        .then(() => {
            return renderApp(getRoutes(store), store, req.url);
        })
        .catch((error) => {
            if (error.status === 301) {
                console.log('Redirect to', error.location);
                res.redirect(error.location);

                return Promise.reject('Redirect');
            } else {
                console.log('Unhandled render error (!)');
            }

            return Promise.resolve();
        })
        .then((renderedApp) => {
            const state = store.getState();

            res.render('index', {
                assetsUrl: isProduction ? '/' : 'http://localhost:9000/',
                app: renderedApp,
                initialState: JSON.stringify(state)
            });

            next();
        })
        .catch((error) => {
            console.log('Render Error:');
            console.log('url:', req.url);
            console.log('error:', error);

            next();
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});

function renderApp(routes, store, location) {
    return new Promise((resolve, reject) => {
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

            resolve(ReactDom.renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            ));
        });
    });
}
