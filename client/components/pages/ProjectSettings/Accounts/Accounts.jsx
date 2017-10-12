import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from 'config/config';
import { withCookies } from 'warehouse';

import AccountsList from './AccountsList';

import {
    getAccountsData
} from 'store/accounts/selectors';

import {
    mapObjectToArray
} from 'store/helpers';

import {
    getAccountsList
} from 'store/accounts/actions';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./accounts.scss');
}

class Accounts extends Component {
    static propTypes = {
        accounts: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string,
            value: PropTypes.number,
            initValue: PropTypes.number,
            currency: PropTypes.shape({
                sign: PropTypes.isRequired
            }).isRequired
        })),
        translations: PropTypes.object,
        getCookies: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        translations: {
            title: 'Accounts'
        }
    };

    componentDidMount() {
        const cookies = this.props.getCookies();

        this.props.dispatch(getAccountsList(cookies));
    }

    render() {
        const {
            accounts
        } = this.props;

        return (
            <div className='accounts-settings'>
                <AccountsList
                    accounts={accounts}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const accounts = mapObjectToArray(getAccountsData(state));

    return {
        accounts
    };
}

export default connect(mapStateToProps)(withCookies(Accounts));
