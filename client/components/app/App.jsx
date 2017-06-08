import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import config from 'config';
import { isAuthenticated } from 'utils/auth';
import { Layout } from 'components/layout';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./app.scss');
}

class App extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        children: PropTypes.node
    };

    static defaultProps = {
        isAuthenticated: false
    };

    render() {
        const { isAuthenticated } = this.props;

        return (
            <Layout isAuthenticated={isAuthenticated}>
                {this.props.children}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: isAuthenticated(state)
    };
}

export default connect(mapStateToProps)(App);
