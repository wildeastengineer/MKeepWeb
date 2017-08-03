import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from 'config';

import { Layout } from 'components/layout';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./app.scss');
}

class App extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <Layout>
                {this.props.children}
            </Layout>
        );
    }
}

export default App;
