import React  from 'react';
import PropTypes from 'prop-types';

import config from 'config/config';

import AccountsListItem from '../AccountsListItem';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./accountsList.scss');
}

const propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string,
        value: PropTypes.number,
        initValue: PropTypes.number,
        currency: PropTypes.shape({
            sign: PropTypes.isRequired
        }).isRequired
    })),
    translations: PropTypes.object
};

const defaultProps = {
    accounts: [],
    translations: {
        header: {
            name: 'Name',
            currentValue: 'Current Value',
            initValue: 'Initial Value',
            currency: 'Currency'
        }
    }
};

function AccountsList({
                          accounts,
                          translations
                      }) {
    return (
        <table className='accounts-list'>
            <thead>
                <tr>
                    <th>
                        {translations.header.name}
                    </th>
                    <th>
                        {translations.header.currentValue}
                    </th>
                    <th>
                        {translations.header.currency}
                    </th>
                    <th>
                        {translations.header.initValue}
                    </th>
                </tr>
            </thead>
            <tbody>
                {accounts.map((account) => (
                    <AccountsListItem
                        key={account._id}
                        {...account}
                    />
                ))}
            </tbody>
        </table>
    );
}

AccountsList.propTypes = propTypes;
AccountsList.defaultProps = defaultProps;

export default AccountsList;
