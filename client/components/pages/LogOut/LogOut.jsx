import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { withCookies } from 'warehouse';
import { logOut } from 'store/auth/actions';

class LogOut extends Component {
    static propTypes = {
        getCookies: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    logOut = () => {
        const cookies = this.props.getCookies();

        this.props.dispatch(logOut(cookies));
        this.props.dispatch(push('/'));
    };

    componentWillMount() {
        this.logOut();
    }

    render() {
        return null;
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(withCookies(LogOut));
