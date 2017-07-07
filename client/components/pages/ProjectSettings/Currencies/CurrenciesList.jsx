import React  from 'react';
import PropTypes from 'prop-types';

import CurrenciesListItem from './CurrenciesListItem';

const propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        sign: PropTypes.string,
        iso: PropTypes.string,
        name: PropTypes.string,
        country: PropTypes.string
    })),
    actionTitle: PropTypes.string,
    onButtonClick: PropTypes.func
};

const defaultProps = {
    currencies: [],
    actionTitle: '',
    onButtonClick: () => {}
};

function CurrenciesList({ currencies, actionTitle, onButtonClick }) {
    return (
        <ul className='currencies-list'>
            {currencies.map((currency) => (
                <CurrenciesListItem
                    key={currency._id}
                    {...currency}
                    actionTitle={actionTitle}
                    onButtonClick={onButtonClick}
                />
            ))}
        </ul>
    );
}

CurrenciesList.propTypes = propTypes;
CurrenciesList.defaultProps = defaultProps;

export default CurrenciesList;
