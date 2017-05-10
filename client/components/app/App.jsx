import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isAuthenticated } from 'components/auth';
import { Layout } from 'components/layout';

if (process.env.BROWSER) {
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
