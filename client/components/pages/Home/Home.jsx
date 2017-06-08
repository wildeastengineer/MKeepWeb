import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { isAuthenticated } from 'utils/auth';
import Landing from './Landing/';

class Home extends Component {
    static propTypes = {
        translations: PropTypes.object,
        isAuthenticated: PropTypes.bool,
        redirect: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        translations: {
            title: 'Home'
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated && nextProps.redirect) {
            nextProps.dispatch(push(nextProps.redirect));
        }
    }

    render() {
        if (!this.props.isAuthenticated ) {
            return <Landing/>;
        }

        return (
            <div>
                { this.props.translations.title }
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
