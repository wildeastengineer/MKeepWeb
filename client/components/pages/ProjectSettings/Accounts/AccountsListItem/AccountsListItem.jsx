import React  from 'react';

import config from 'config/config';
import AccountModel from 'entities/Account';

import { Money } from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./accountsListItem.scss');
}

const propTypes = AccountModel.propTypes;
const defaultProps = AccountModel.defaultProps;

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
