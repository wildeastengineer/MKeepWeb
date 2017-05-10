import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { isAuthenticated } from './';

function requireAuthentication(Component) {
    class AuthenticatedComponent extends Component {
        static propTypes = {
            isAuthenticated: PropTypes.bool
        };

        static defaultProps = {
            isAuthenticated: false
        };

        componentWillMount() {
            this.checkAuth(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props) {
            if (!props.isAuthenticated) {
                props.dispatch(push(`/?redirect=${props.location.pathname}`));
            }
        }

        render() {
            if (this.props.isAuthenticated) {
                return <Component {...this.props}/>;
            } else {
                return null;
            }
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: isAuthenticated(state)
        };
    }

    return connect(mapStateToProps)(AuthenticatedComponent);
}

export default requireAuthentication;
