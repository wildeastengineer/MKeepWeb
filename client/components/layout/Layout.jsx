import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import config from 'config';
import { isAuthenticated } from 'utils/auth';
import { NavigationMenu, UserInfo, LanguageSelector } from '../layout';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./layout.scss');
}

const propTypes = {
    isAuthenticated: PropTypes.bool,
    children: PropTypes.node
};

const defaultProps = {
    isAuthenticated: false
};

function Layout ({ children, isAuthenticated }) {
    return (
        <div className='app-layout'>
            <div className='app-layout__header'>
                <LanguageSelector/>
                <UserInfo />
            </div>
            <div className='app-layout__body'>
                {isAuthenticated && (
                    <div className='app-layout__side-bar'>
                        <NavigationMenu/>
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
Layout.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {
        isAuthenticated: isAuthenticated(state)
    };
}

export default connect(mapStateToProps)(Layout);
