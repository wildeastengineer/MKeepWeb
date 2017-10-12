import React  from 'react';
import PropTypes from 'prop-types';

import config from 'config/config';

import { Money } from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./accountsListItem.scss');
}

const propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.number,
    initValue: PropTypes.number,
    currency: PropTypes.shape({
        sign: PropTypes.isRequired
    }).isRequired
};
const defaultProps = {
    name: 'New Account',
    value: 0,
    initValue: 0,
};

function AccountsListItem({
                              name,
                              value,
                              initValue,
                              currency
                          }) {
    return (
        <tr className='account-list-item'>
            <td className='account-list-item__account-name'>
                {name}
            </td>
            <td className='account-list-item__account-value'>
                <Money
                    value={value}
                />
            </td>
            <td className='account-list-item__account-currency'>
                {currency.sign}
            </td>
            <td className='account-list-item__account-value'>
                <Money
                    value={initValue}
                />
            </td>
        </tr>
    );
}

AccountsListItem.propTypes = propTypes;
AccountsListItem.defaultProps = defaultProps;

export default AccountsListItem;
