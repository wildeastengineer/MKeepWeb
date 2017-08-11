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
    isDefault: PropTypes.bool,
    translations: PropTypes.object
};

const defaultProps = {
    name: '',
    country: '',
    isUsed: false,
    isDefault: false,
    translations: {
        currencies: {},
        countries: {}
    }
};

const normalizeFieldName = (name) => name.toLowerCase().replace(/ /g, '_');

const translate = (translations, value) => {
    const normalizedValue = normalizeFieldName(value);

    return translations[normalizedValue] ? translations[normalizedValue] : value;
};

function CurrenciesListItem({ _id, sign, name, country, isUsed, isDefault, translations }) {
    const translateCountry = translate.bind(null, translations.countries);
    const translateName = translate.bind(null, translations.currencies);

    let currencyNameClass;

    currencyNameClass = 'currency-list-item__currency-name';
    currencyNameClass += isUsed ? ' currency-list-item__currency-name_used' : '';

    return (
        <li className='currency-list-item'>
            <CheckControl
                defaultChecked={isUsed}
                className='currency-list-item__use-currency-control'
                title={translations.titles.use_currency}
            />
            <div className='currency-list-item__currency-sign'>
                <div>
                    {sign}
                </div>
            </div>
            <div className='currency-list-item__currency-info'>
                <div className={currencyNameClass}>
                    {translateName(name)}
                </div>
                <div className='currency-list-item__country-name'>
                    {translateCountry(country)}
                </div>
            </div>
            {isUsed ? (
                <RadioButton
                    name='defaultCurrency'
                    value={_id}
                    defaultChecked={isDefault}
                    className='currency-list-item__set-default-control'
                    title={translations.titles.set_default_currency}
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
