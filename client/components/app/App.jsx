import React, { Component, PropTypes } from 'react';

import { Layout } from 'components/layout';

if (process.env.BROWSER) {
    require('./app.scss');
}

const propTypes = {
    children: PropTypes.node
};

class App extends Component {
    render() {
        return (
            <Layout>
                {this.props.children}
            </Layout>
        );
    }
}

App.propTypes = propTypes;

export default App;
