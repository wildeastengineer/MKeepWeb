import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router'
import { Icon } from 'components/common';

import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./navigationButton.scss');
}

const propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.string
};

const defaultProps = {
    name: 'No Name',
    url: '#',
    icon: 'not_interested'
};

function NavigationButton({name, url, icon}) {
    return (
        <Link
            to={url}
            className='mk-navigation-button'
            activeClassName='mk-navigation-button_active'
        >
            <span>
                {name}
            </span>
            <Icon icon={icon}/>
        </Link>
    );
}

NavigationButton.propTypes = propTypes;
NavigationButton.defaultProps = defaultProps;

export default NavigationButton;
