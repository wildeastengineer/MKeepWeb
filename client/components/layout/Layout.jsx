import React from 'react';
import PropTypes from 'prop-types';
import { NavigationMenu, UserInfo } from '../layout';

if (process.env.BROWSER) {
    require('./layout.scss');
}

const propTypes = {
    isAuthenticated: PropTypes.bool,
    children: PropTypes.node
};

function Layout ({ children, isAuthenticated }) {
    return (
        <div className='app-layout'>
            <div className='app-layout__header'>
                <UserInfo />
            </div>
            <div className='app-layout__body'>
                {isAuthenticated && (
                    <div className='app-layout__side-bar'>
                        <NavigationMenu />
                    </div>
                )}
                <div className='app-layout__content'>
                    { children }
                </div>
            </div>
            <div className='app-layout__footer'/>
        </div>
    );
}

Layout.propTypes = propTypes;

export default Layout;
