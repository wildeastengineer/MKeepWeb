import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';

import routes from 'routes';

const app = (
    <Router history={browserHistory}>
        {routes}
    </Router>
);

ReactDOM.render(app, document.getElementById('MK-app'));
