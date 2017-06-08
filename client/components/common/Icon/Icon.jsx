import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import iconsMap from './iconsMap';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./icon.scss');
}

const propTypes = {
    icon: PropTypes.string.isRequired
};

const defaultProps = {
};

function Icon({ icon }) {
    return (
        <i className='material-icons mk-icon'>
            {String.fromCharCode(parseInt(iconsMap[icon], 16))}
        </i>
    );
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
