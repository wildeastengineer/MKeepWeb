import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, FlatButton } from 'components/common';

if (process.env.BROWSER) {
    require('./userInfoMenu.scss');
}

const propTypes = {
    userName: PropTypes.string,
    onLogoutClick: PropTypes.func.isRequired
};

function UserInfoMenu({userName, onLogoutClick}) {
    return (
        <div className='user-info-menu'>
            <div className='user-info-menu__contacts'>
                <Avatar/>
                <span className='user-info-menu__user-name'>
                    {userName}
                </span>
            </div>
            <div className='user-info-menu__actions'>
                <FlatButton onClick={onLogoutClick}>
                    Logout
                </FlatButton>
            </div>
        </div>
    );
}

UserInfoMenu.propTypes = propTypes;

export default UserInfoMenu;
