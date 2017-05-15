import React, { PropTypes } from 'react';
import config from 'config';

if (process.env.BROWSER) {
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

