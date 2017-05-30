import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isAuthenticated } from 'utils/auth';
import AuthBlock from './AuthBlock';
import UserInfoBlock from './UserInfoBlock';

if (process.env.BROWSER) {
    require('./userInfo.scss');
}

class AuthorizationBlock extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        userName: PropTypes.string
    };

    static defaultProps = {
        isAuthenticated: false,
        userName: ''
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='user-info'>
                {this.props.isAuthenticated ?
                    (
                        <UserInfoBlock />
                    ) : (
                        <AuthBlock />
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const user = state.user;

    return {
        isAuthenticated: isAuthenticated(state),
        userName: user.profileFetched ? user.profile.name : null
    };
}

export default connect(mapStateToProps)(AuthorizationBlock);
