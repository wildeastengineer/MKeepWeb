import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { isAuthenticated } from 'utils/auth';

class Home extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated && nextProps.redirect) {
            nextProps.dispatch(push(nextProps.redirect));
        }
    }

    render() {
        return (
            <div>
                Home
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: isAuthenticated(state),
        redirect: ownProps.location.query.redirect
    };
}

export default connect(mapStateToProps)(Home);
