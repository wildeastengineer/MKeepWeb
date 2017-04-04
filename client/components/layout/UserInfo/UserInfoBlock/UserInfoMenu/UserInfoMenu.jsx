import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
    require('./userInfoMenu.scss');
}

const propTypes = {
};

function UserInfoMenu() {
    return (
        <div className='user-info-menu'>
            User Info Menu
        </div>
    );
}

UserInfoMenu.propTypes = propTypes;

export default UserInfoMenu;

