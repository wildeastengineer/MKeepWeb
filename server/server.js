/*eslint-env node*/

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';

import getLogger from '../client/logger';
import renderApp from '../client/server';

const logger = getLogger('Server');
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
    renderApp(req, res)
        .then((result) => {
            res.render('index', {
                assetsUrl: isProduction ? '/dist/' : 'http://localhost:9000/',
                app: result.renderedApp,
                initialState: JSON.stringify(result.state)
            });

            next();
        })
        .catch((error) => {
            if (error.status === 301) {
                logger.trace(`Redirect to ${error.location}`);

                res.redirect(error.location);

                return Promise.reject('Redirect');
            } else {
                logger.error('Render Error:');
                logger.error('url:', req.url);
                logger.error('error:', error);
            }

            next();
        });
});

app.listen(PORT, () => {
    logger.info(`Server listening on: ${PORT}`);
});
