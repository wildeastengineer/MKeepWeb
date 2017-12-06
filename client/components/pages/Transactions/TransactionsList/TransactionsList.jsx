import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCookies } from 'warehouse';
import config from 'config/config';
import getLogger from 'logger';

import TransactionListItem from './TransactionListItem';

import {
    AddEntityButton
} from 'components/common';

import {
    TransactionEditModal
} from 'components/entities/transactions';

import {
    getTransactionsList,
} from 'store/transactions/actions';

import {
    getCategoriesList,
} from 'store/categories/actions';

import {
    getAccountsList,
} from 'store/accounts/actions';

import {
    getTransactionsIds
} from 'store/transactions/selectors';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./transactionsList.scss');
}

const logger = getLogger('AccountsList');

class TransactionsList extends Component {
    static propTypes = {
        projectId: PropTypes.string.isRequired,
        transactionsIds: PropTypes.arrayOf(PropTypes.string),
        dispatch: PropTypes.func.isRequired,
        getCookies: PropTypes.func.isRequired,
        translations: PropTypes.object
    };

    static defaultProps = {
        accounts: [],
        translations: {
            header: {
                date: 'Date',
                value: 'Value',
                category: 'Category',
                accountSource: 'Account',
                note: 'Note'
            }
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };
    }

    componentDidMount() {
        const projectId = this.props.projectId;
        const cookies = this.props.getCookies();

        if (projectId) {
            this.props.dispatch(getTransactionsList(projectId, cookies));
            this.props.dispatch(getCategoriesList(projectId, cookies));
            this.props.dispatch(getAccountsList(projectId, cookies));
        } else {
            logger.error('Project id is not defined');
        }
    }

    handleAddButtonClick = () => {
        this.setState({
            modalIsOpen: true
        });
    };

    handleCloseRequest = () => {
        this.setState({
            modalIsOpen: false
        });
    };

    render() {
        const {
            projectId,
            transactionsIds,
            translations
        } = this.props;

        const {
            modalIsOpen
        } = this.state;

        const transactionFieldsToDisplay = [
            'date',
            'value',
            'accountSource',
            'category',
            'note'
        ];

        return (
            <div className='transactions-list-wrapper'>
                <div className='transactions-list'>
                    <table>
                        <thead>
                        <tr>
                            {transactionFieldsToDisplay.map((field) => (
                                <th key={field}>
                                    {translations.header[field]}
                                </th>
                            ))}
                            <th className='button-column'/>
                            <th className='button-column'/>
                        </tr>
                        </thead>
                        <tbody>
                        {transactionsIds.map((transactionId) => (
                            <TransactionListItem
                                key={transactionId}
                                transactionId={transactionId}
                                projectId={projectId}
                                fieldsToDisplay={transactionFieldsToDisplay}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
                <AddEntityButton
                    className='add-transaction-button'
                    onClick={this.handleAddButtonClick}
                />
                {modalIsOpen && (
                    <TransactionEditModal
                        onCloseRequest={this.handleCloseRequest}
                        projectId={projectId}
                        transaction={{}}
                    />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const transactionsIds = getTransactionsIds(state);

    return {
        transactionsIds
    };
}

export default connect(mapStateToProps)(withCookies(TransactionsList));
