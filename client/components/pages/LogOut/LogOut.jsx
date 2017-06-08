import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { logOut } from 'store/actions/authActions';

class LogOut extends Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    logOut = () => {
        this.props.dispatch(logOut());
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

export default connect(mapStateToProps)(LogOut);
