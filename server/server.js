import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';

import React    from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import appRoutes from '../client/routes/routes';

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

process.env.BROWSER = false;

app.set('views', path.join(__dirname, '/templates/'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((req, res) => {
    renderApp(appRoutes, req.url).then(
        (renderedApp) => {
            res.render('index', {
                assetsUrl: isProduction ? '/' : 'http://localhost:9000/',
                app: renderedApp
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

function renderApp(routes, location) {
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
                <RouterContext {...renderProps} />
            ));
        });
    });
}
