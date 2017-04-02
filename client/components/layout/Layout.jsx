import React, { Component, PropTypes } from 'react';
import { NavigationMenu, UserInfo } from '../layout';

if (process.env.BROWSER) {
    require('./layout.scss');
}

const propTypes = {
    children: PropTypes.node
};

class Layout extends Component {
    render() {
        return (
            <div className='app-layout'>
                <div className='app-layout__header'>
                    <UserInfo />
                </div>
                <div className='app-layout__body'>
                    <div className='app-layout__side-bar'>
                        <NavigationMenu />
                    </div>
                    <div className='app-layout__content'>
                        {this.props.children}
                    </div>
                </div>
                <div className='app-layout__footer'></div>
            </div>
        );
    }
}

Layout.propTypes = propTypes;

export default Layout;
