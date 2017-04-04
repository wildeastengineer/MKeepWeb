import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AuthBlock from './AuthBlock';
import UserInfoBlock from './UserInfoBlock';

if (process.env.BROWSER) {
    require('./userInfo.scss');
}

const propTypes = {
    isAuthorized: PropTypes.bool,
    userName: PropTypes.string
};

class AuthorizationBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='user-info'>
                {this.props.isAuthorized ?
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

AuthorizationBlock.propTypes = propTypes;

function mapStateToProps(state) {
    const user = state.user;

    return {
        isAuthorized: user.authorized,
        userName: user.profileFetched ? user.profile.name : null
    };
}

export default connect(mapStateToProps)(AuthorizationBlock);

