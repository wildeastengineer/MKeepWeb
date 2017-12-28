import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    getAccountById
} from 'store/accounts/selectors';

import {
    Money
} from 'components/common';

class AccountsInformer extends Component {
    static propTypes = {
        accountId: PropTypes.string.isRequired,
        account: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string,
            value: PropTypes.number,
            currency: PropTypes.shape({
                sign: PropTypes.isRequired
            }).isRequired
        }),
        dispatch: PropTypes.func.isRequired,
        translations: PropTypes.object
    };

    static defaultProps = {
        translations: {}
    };

    render() {
        const {
            name,
            value,
            currency
        } = this.props.account;

        return (
            <div
                className='accounts-informer__row'
            >
                <span
                    className='accounts-informer__account-name'
                >
                     {name}
                </span>
                <Money
                    className='accounts-informer__account-value'
                    value={value}
                />
                <span
                    className='accounts-informer__account-currency'
                >
                    {currency.sign}
                </span>
            </div>
        );
    }
}


function mapStateToProps(state, props) {
    const account = getAccountById(state, props.accountId);

    return {
        account
    };
}

export default connect(mapStateToProps)(AccountsInformer);
