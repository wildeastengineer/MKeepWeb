import React from 'react';
import PropTypes from 'prop-types';
import config from 'config/config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./avatar.scss');
}

const propTypes = {
    id: PropTypes.string
};

const defaultProps = {
    id: 'default-unisex'
};

function Avatar({ id }) {
    const src = `${config.static.avatars}${id}.svg`;

    return (
        <img src={src}
             className='mk-avatar-icon'
             alt='Avatar' />
    );
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;

