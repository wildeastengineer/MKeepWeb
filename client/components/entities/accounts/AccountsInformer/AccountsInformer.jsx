import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCookies } from 'warehouse';
import config from 'config/config';

import {
    getAccountsList
} from 'store/accounts/actions';

import {
    getAccountIds
} from 'store/accounts/selectors';

import AccountRow from './AccountRow';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./accounts-informer.scss');
}

class AccountsInformer extends Component {
    static propTypes = {
        projectId: PropTypes.string.isRequired,
        accountIds: PropTypes.arrayOf(PropTypes.string),
        dispatch: PropTypes.func.isRequired,
        getCookies: PropTypes.func.isRequired,
        translations: PropTypes.object
    };

    static defaultProps = {
        accountIds: [],
        translations: {}
    };

    componentDidMount() {
        const {
            projectId,
            getCookies
        } = this.props;
        const cookies = getCookies();

        if (projectId) {
            this.props.dispatch(getAccountsList(projectId, cookies));
        }
    }

    render() {
        const {
            accountIds
        } = this.props;

        return (
            <div
                className='accounts-informer'
            >
                {accountIds.map(accountId => (
                    <AccountRow
                        key={accountId}
                        accountId={accountId}
                    />
                ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    let accountIds = getAccountIds(state);

    return {
        accountIds
    };
}

export default connect(mapStateToProps)(withCookies(AccountsInformer));
