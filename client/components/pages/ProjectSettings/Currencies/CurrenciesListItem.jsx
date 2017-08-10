import React  from 'react';
import PropTypes from 'prop-types';

import config from 'config/config';

import { CheckControl, RadioButton } from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./currenciesListItem.scss');
}

const propTypes = {
    _id: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,
    name: PropTypes.string,
    country: PropTypes.string,
    isUsed: PropTypes.bool,
    isDefault: PropTypes.bool
};

const defaultProps = {
    name: '',
    country: '',
    isUsed: false,
    isDefault: false
};

function CurrenciesListItem({ _id, sign, name, country, isUsed, isDefault }) {
    let currencyNameClass;

    currencyNameClass = 'currency-list-item__currency-name';
    currencyNameClass += isUsed ? ' currency-list-item__currency-name_used' : '';

    return (
        <li className='currency-list-item'>
            <CheckControl
                defaultChecked={isUsed}
                className='currency-list-item__use-currency-control'
                title='Use this currency'
            />
            <div className='currency-list-item__currency-sign'>
                <div>
                    {sign}
                </div>
            </div>
            <div className='currency-list-item__currency-info'>
                <div className={currencyNameClass}>
                    {name}
                </div>
                <div className='currency-list-item__country-name'>
                    {country}
                </div>
            </div>
            {isUsed ? (
                <RadioButton
                    name='defaultCurrency'
                    value={_id}
                    defaultChecked={isDefault}
                    className='currency-list-item__set-default-control'
                    title='Set as default'
                />
            ) : (
                <div
                    className='currency-list-item__set-default-control-stub'
                />
            )}
        </li>
    );
}

CurrenciesListItem.propTypes = propTypes;
CurrenciesListItem.defaultProps = defaultProps;

export default CurrenciesListItem;
