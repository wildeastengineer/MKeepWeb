import express from 'express';

import React    from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import appRoutes from '../client/routes/routes';

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

app.set('views', path.join(__dirname, '/templates/'));
app.set('view engine', 'ejs');

console.log('---- match', match);

app.use((req, res) => {
    console.log('match 2', match);

    renderApp(appRoutes, req.url).then(
        (renderedApp) => {
            res.render('index', {
                assetsUrl: isProduction ? '/' : 'http://localhost:9000/',
                app: renderedApp
            });
        },
        (error) => {
            console.log('Render Error:', error);
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
            console.log('dsfsdfsdfsdf');

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

            console.log('RouterContext', RouterContext);

            resolve(ReactDom.renderToString(
                <RouterContext {...renderProps} />
            ));
        });
    });
}
