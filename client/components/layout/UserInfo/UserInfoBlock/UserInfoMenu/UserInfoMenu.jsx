import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, FlatButton } from 'components/common';

if (process.env.BROWSER) {
    require('./userInfoMenu.scss');
}

const propTypes = {
    userName: PropTypes.string,
    onLogoutClick: PropTypes.func.isRequired,
    translations: PropTypes.object
};

const defaultProps = {
    translations: {
        button: {
            logOut: 'Log Out'
        }
    }
};

function UserInfoMenu({userName, onLogoutClick, translations}) {
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
                    {translations.button.logOut}
                </FlatButton>
            </div>
        </div>
    );
}

UserInfoMenu.propTypes = propTypes;

export default UserInfoMenu;
