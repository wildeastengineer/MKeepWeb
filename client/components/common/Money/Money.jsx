import React from 'react';
import PropTypes from 'prop-types';

import config from 'config';
import { formatMoney } from './moneyHelper';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./money.scss');
}

const propTypes = {
    value: PropTypes.number,
    currency: PropTypes.string,
    className: PropTypes.string
};

const defaultProps = {
    value: 0,
    currency: '',
    className: ''
};

function Money({ value, className, currency }) {
    const componentClassName = `mk-money ${className}`.trim();

    return (
        <span
            className={componentClassName}
        >
            {formatMoney(value)}{currency}
        </span>
    );
}

Money.propTypes = propTypes;
Money.defaultProps = defaultProps;

export default Money;
