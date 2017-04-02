import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';

import React    from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Store from 'store';
import appRoutes from '../client/routes/routes';
import { logInByCookie } from '../client/store/actions/authActions';

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

process.env.BROWSER = false;

app.set('views', path.join(__dirname, '/templates/'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use((req, res) => {
    const store = Store();

    store.dispatch(logInByCookie(req.cookies))
        .then((data) => {
            if (data) {
                res.cookie('accessToken', data.accessToken, {
                    maxAge: data.tokenMaxAge
                });
                res.cookie('refreshToken', data.refreshToken, {
                    maxAge: data.tokenMaxAge
                });
            }

            return renderApp(appRoutes, store, req.url);
        })
        .then((renderedApp) => {
                const state = store.getState();

                res.render('index', {
                    assetsUrl: isProduction ? '/' : 'http://localhost:9000/',
                    app: renderedApp,
                    initialState: JSON.stringify(state)
                });
            },
            (error) => {
                console.log('Render Error');
                console.log('url:', req.url);
                console.log('error:', error);
            }
        );
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
