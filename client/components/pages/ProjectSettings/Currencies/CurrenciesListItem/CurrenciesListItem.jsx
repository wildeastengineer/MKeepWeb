import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from 'config/config';

import { CheckControl, RadioButton } from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./currenciesListItem.scss');
}

const normalizeFieldName = (name) => name.toLowerCase().replace(/ /g, '_');

const translate = (translations, value) => {
    const normalizedValue = normalizeFieldName(value);

    return translations[normalizedValue] ? translations[normalizedValue] : value;
};

class CurrenciesListItem extends Component {
    static propTypes = {
        _id: PropTypes.string.isRequired,
        sign: PropTypes.isRequired,
        name: PropTypes.isRequired,
        iso: PropTypes.string,
        country: PropTypes.string,
        isUsed: PropTypes.bool,
        isDefault: PropTypes.bool,
        onUseControlChange: PropTypes.func,
        onSetDefaultControlChange: PropTypes.func,
        translations: PropTypes.object
    };

    static defaultProps = {
        iso: '',
        country: '',
        isUsed: false,
        isDefault: false,
        onUseControlChange: () => {},
        onSetDefaultControlChange: () => {},
        translations: {
            currencies: {},
            countries: {}
        }
    };

    handleUseControlChange = () => {
        const {
            _id,
            isUsed
        } = this.props;

        this.props.onUseControlChange(_id, isUsed);
    };

    handleSetDefaultControlChange = () => {
        const {
            _id
        } = this.props;

        this.props.onSetDefaultControlChange(_id);
    };

    render() {
        const {
            _id, sign, name, country, isUsed, isDefault
        } = this.props;
        const {
            translations
        } = this.props;

        const translateCountry = translate.bind(null, translations.countries);
        const translateName = translate.bind(null, translations.currencies);

        let currencyNameClass;

        currencyNameClass = 'currency-list-item__currency-name';
        currencyNameClass += isUsed ? ' currency-list-item__currency-name_used' : '';

        return (
            <li className='currency-list-item'>
                <CheckControl
                    checked={isUsed}
                    className='currency-list-item__use-currency-control'
                    title={translations.titles.use_currency}
                    onChange={this.handleUseControlChange}
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
                        checked={isDefault}
                        className='currency-list-item__set-default-control'
                        title={translations.titles.set_default_currency}
                        onChange={this.handleSetDefaultControlChange}
                    />
                ) : (
                    <div
                        className='currency-list-item__set-default-control-stub'
                    />
                )}
            </li>
        );
    }
}

export default CurrenciesListItem;
