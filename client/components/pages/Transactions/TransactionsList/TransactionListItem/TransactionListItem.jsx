import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withCookies } from 'warehouse';
import { connect } from 'react-redux';

import {
    removeTransaction
} from 'store/transactions/actions';

import {
    getTransactionById
} from 'store/transactions/selectors';

import {
    getCategoryById
} from 'store/categories/selectors';

import {
    getAccountById
} from 'store/accounts/selectors';

import config from 'config/config';

import {
    DateDisplay,
    FlatButton,
    Icon
} from 'components/common';

import {
    TransactionEditModal
} from 'components/entities/transactions';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./transactionListItem.scss');
}

class TransactionListItem extends Component {
    static propTypes = {
        transactionId: PropTypes.string.isRequired,
        projectId: PropTypes.string.isRequired,
        transaction: PropTypes.shape({
            _id: PropTypes.string,
            value: PropTypes.number,
            accountSource: PropTypes.string,
            accountDestination: PropTypes.string,
            category: PropTypes.string,
            note: PropTypes.string,
            date: PropTypes.object
        }),
        category: PropTypes.shape({
            name: PropTypes.string
        }),
        accountSource: PropTypes.shape({
            name: PropTypes.string
        }),
        accountDestination: PropTypes.shape({
            name: PropTypes.string
        }),
        fieldsToDisplay: PropTypes.arrayOf(PropTypes.string),
        getCookies: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        translations: PropTypes.object
    };

    static defaultProps = {
        fieldsToDisplay: [],
        translations: {
            transfer: 'Transfer'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        }
    }

    editClickHandler = () => {
        this.setState({
            modalIsOpen: true
        });
    };

    removeClickHandler = () => {
        const {
            projectId,
            transaction,
            getCookies,
            dispatch
        } = this.props;
        const cookies = getCookies();

        dispatch(removeTransaction(projectId, transaction, cookies));
    };

    handleCloseRequest = () => {
        this.setState({
            modalIsOpen: false
        });
    };

    getFieldMarkup = (fieldName) => {
        const {
            transaction,
            accountSource
        } = this.props;
        let field;

        switch (fieldName) {
            case 'date':
                field = (
                    <DateDisplay
                        value={transaction[fieldName]}
                    />
                );
                break;
            case 'accountSource':
                field = (
                    <span>
                        {accountSource ? accountSource.name : ''}
                    </span>
                );
                break;
            case 'category':
                field = (
                    <span>
                        {this.getCategoryName()}
                    </span>
                );
                break;
            default:
                field = transaction[fieldName];
        }

        return (
            <td
                key={fieldName}
                className={`account-list-item__account-${fieldName}`}
            >
                {field}
            </td>
        );
    };

    getCategoryName() {
        const { transaction } = this.props;
        const { type } = transaction;

        if (type === 'transfer') {
            const {
                accountDestination,
                translations
            } = this.props;
            const accountDestinationName = accountDestination ? accountDestination.name : '';

            return `${translations.transfer} (→ ${accountDestinationName})`;
        } else {
            const { category } = this.props;

            return category ? category.name : '';
        }
    }

    render() {
        const {
            fieldsToDisplay,
            projectId,
            transaction
        } = this.props;

        const {
            modalIsOpen
        } = this.state;

        return (
            <tr className='account-list-item'>
                { fieldsToDisplay.map(this.getFieldMarkup) }
                <td className='button-cell'>
                    <FlatButton onClick={this.editClickHandler}>
                        <Icon icon='edit'/>
                    </FlatButton>
                    {modalIsOpen && (
                        <TransactionEditModal
                            onCloseRequest={this.handleCloseRequest}
                            projectId={projectId}
                            transaction={transaction}
                        />
                    )}
                </td>
                <td className='button-cell'>
                    <FlatButton onClick={this.removeClickHandler}>
                        <Icon icon='delete'/>
                    </FlatButton>
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, props) {
    const {
        transactionId
    } = props;

    const transaction = getTransactionById(state, transactionId);
    const category = getCategoryById(state, transaction.category);
    const accountSource = getAccountById(state, transaction.accountSource);
    const accountDestination = getAccountById(state, transaction.accountDestination);

    return {
        transaction,
        category,
        accountSource,
        accountDestination
    };
}

export default connect(mapStateToProps)(withCookies(TransactionListItem));
