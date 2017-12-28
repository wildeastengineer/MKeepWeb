import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./flagIcon.scss');
}

const propTypes = {
    className: PropTypes.string,
    country: PropTypes.string,
    onClick: PropTypes.func
};

const defaultProps = {
    className: '',
    country: 'none'
};

function FlagIcon({ className, country, onClick }) {
    const cssClass = `mk-flag-icon ${className} mk-flag-${country}`.trim();

    return (
        <img
            className={cssClass}
            src={`/flags/${country}.svg`}
            onClick={onClick}
        />
    );
}

FlagIcon.propTypes = propTypes;
FlagIcon.defaultProps = defaultProps;

export default FlagIcon;
