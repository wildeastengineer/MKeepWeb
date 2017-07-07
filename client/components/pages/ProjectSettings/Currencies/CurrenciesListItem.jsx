import React  from 'react';
import PropTypes from 'prop-types';

import { FlatButton } from 'components/common';

const propTypes = {
    _id: PropTypes.string,
    sign: PropTypes.string,
    iso: PropTypes.string,
    name: PropTypes.string,
    country: PropTypes.string,
    translations: PropTypes.object,
    actionTitle: PropTypes.string,
    onButtonClick: PropTypes.func
};

const defaultProps = {
    actionTitle: '',
    onButtonClick: () => {}
};

function CurrenciesListItem({ _id, sign, iso, name, country, actionTitle, onButtonClick }) {
    return (
        <li className='currency-list-item'>
            <span className='sign'>
                {sign}
            </span>
            <span className='iso'>
                {iso}
            </span>
            <span className='name'>
                {name} - {country}
            </span>
            <FlatButton
                onClick={onButtonClick.bind(null, _id)}
            >
                {actionTitle}
            </FlatButton>
        </li>
    );
}

CurrenciesListItem.propTypes = propTypes;
CurrenciesListItem.defaultProps = defaultProps;

export default CurrenciesListItem;
