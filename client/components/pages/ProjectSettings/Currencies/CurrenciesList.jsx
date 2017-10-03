import React  from 'react';
import PropTypes from 'prop-types';

import config from 'config/config';
import CurrencyModel from 'entities/Currency';

import CurrenciesListItem from './CurrenciesListItem';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./currenciesList.scss');
}

const propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.shape(Object.assign({},
        CurrencyModel.propTypes,
        {
            isUsed: PropTypes.bool,
            isDefault: PropTypes.bool
        }
    ))),
    onUseControlChange: PropTypes.func,
    onSetDefaultControlChange: PropTypes.func,
};

const defaultProps = {
    currencies: [],
    onUseControlChange: () => {},
    onSetDefaultControlChange: () => {},
};

function CurrenciesList({
                            currencies,
                            onUseControlChange,
                            onSetDefaultControlChange
                        }) {
    return (
        <ul className='currencies-list'>
            {currencies.map((currency) => (
                <CurrenciesListItem
                    key={currency._id}
                    {...currency}
                    onUseControlChange={onUseControlChange}
                    onSetDefaultControlChange={onSetDefaultControlChange}
                />
            ))}
        </ul>
    );
}

CurrenciesList.propTypes = propTypes;
CurrenciesList.defaultProps = defaultProps;

export default CurrenciesList;
