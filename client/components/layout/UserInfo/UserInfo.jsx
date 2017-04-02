import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AuthBlock from './AuthBlock';

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
                        <span>Hello, {this.props.userName}</span>
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
    const { isAuthorized } = state.user;
    const userName = isAuthorized ? state.user.data.name : '';

    return {
        isAuthorized,
        userName
    };
}

export default connect(mapStateToProps)(AuthorizationBlock);

