import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCookies } from 'warehouse';
import config from 'config/config';

import {
    getCategoriesList
} from 'store/categories/actions';

import {
    getAccountsList
} from 'store/accounts/actions';

import {
    createTransaction,
    updateTransaction
} from 'store/transactions/actions';

import {
    getAccountsData
} from 'store/accounts/selectors';

import {
    getIncomeCategories,
    getExpenseCategories
} from 'store/categories/selectors';

import {
    mapObjectToArray
} from 'store/helpers';

import {
    Button,
    Calendar,
    NumberInput,
    Select,
    TextArea,
    ToggleButtons
} from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./transaction-edit-form.scss');
}

class TransactionEditForm extends Component {
    static propTypes = {
        transaction: PropTypes.shape({
            _id: PropTypes.string,
            value: PropTypes.number,
            accountSource: PropTypes.string,
            accountDestination: PropTypes.string,
            category: PropTypes.string,
            note: PropTypes.string,
            date: PropTypes.string
        }),
        accounts: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            value: PropTypes.string
        })),
        incomeCategories: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            value: PropTypes.string
        })),
        expenseCategories: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            value: PropTypes.string
        })),
        projectId: PropTypes.string,
        onCloseRequest: PropTypes.func,
        dispatch: PropTypes.func.isRequired,
        getCookies: PropTypes.func.isRequired,
        translations: PropTypes.object
    };

    static defaultProps = {
        onCloseRequest: () => {},
        transaction: {
            type: 'expense'
        },
        translations: {
            types: {
                income: 'Income',
                expense: 'Expense',
                transfer: 'Transfer'
            },
            value: {
                placeholder: 'Value'
            },
            note: {
                placeholder: 'Note'
            },
            buttons: {
                save: 'Save'
            }
        }
    };

    constructor(props) {
        super(props);

        const transaction = {
            type: 'expense',
            ...props.transaction
        };

        transaction.date = props.transaction.date ?
                new Date(props.transaction.date) :
                new Date();

        this.state = {
            transaction
        }
    }

    componentDidMount() {
        const {
            projectId,
            getCookies,
            dispatch
        } = this.props;
        const cookies = getCookies();

        dispatch(getAccountsList(projectId, cookies));
        dispatch(getCategoriesList(projectId, cookies));
    }

    componentWillReceiveProps(nextProps) {
        const {
            accounts,
            incomeCategories,
            expenseCategories
        } = nextProps;

        const {
            transaction
        } = this.state;

        if (!transaction.accountSource && accounts.length) {
            this.setState({
                transaction: {
                    ...this.state.transaction,
                    accountSource: accounts[0].value
                }
            });
        }

        switch (transaction.type) {
            case 'income':
                if (!transaction.category && incomeCategories.length) {
                    this.setState({
                        transaction: {
                            ...this.state.transaction,
                            category: incomeCategories[0].value
                        }
                    });
                }

                break;
            case 'expense':
                if (!transaction.category && expenseCategories.length) {
                    this.setState({
                        transaction: {
                            ...this.state.transaction,
                            category: expenseCategories[0].value
                        }
                    });
                }

                if (!transaction.accountDestination && accounts.length) {
                    this.setState({
                        transaction: {
                            ...this.state.transaction,
                            accountDestination: accounts[0].value
                        }
                    });
                }

                break;
        }
    }

    handleSaveClick = () => {
        const {
            projectId,
            onCloseRequest,
            getCookies,
            dispatch
        } = this.props;
        const cookies = getCookies();

        const {
            transaction
        } = this.state;

        if (transaction._id) {
            dispatch(updateTransaction(projectId, transaction._id, transaction, cookies));
        } else {
            dispatch(createTransaction(projectId, transaction, cookies));
        }

        onCloseRequest();
    };

    handleTypeChanged = (type) => {
        this.updateTransactionState('type', type);
    };

    handleValueChanged = (value) => {
        this.updateTransactionState('value', value);
    };

    handleAccountSourceChanged = (accountId) => {
        this.updateTransactionState('accountSource', accountId);
    };

    handleAccountDestinationChanged = (accountId) => {
        this.updateTransactionState('accountDestination', accountId);
    };

    handleCategoryChanged = (categoryId) => {
        this.updateTransactionState('category', categoryId);
    };

    handleNoteChanged = (note) => {
        this.updateTransactionState('note', note);
    };

    handleDateChanged = (date) => {
        this.updateTransactionState('date', date);
    };

    updateTransactionState(field, value) {
        this.setState({
            transaction: {
                ...this.state.transaction,
                [field]: value
            }
        });
    }

    render() {
        const {
            translations,
            accounts,
            incomeCategories,
            expenseCategories
        } = this.props;

        const {
            transaction
        } = this.state;

        transaction.type = transaction.type || 'expense';

        const types = [
            {
                text: translations.types.income,
                value: 'income'
            },
            {
                text: translations.types.expense,
                value: 'expense'
            },
            {
                text: translations.types.transfer,
                value: 'transfer'
            }
        ];

        let categories;
        let isTransfer = false;

        switch (transaction.type) {
            case 'income':
                categories = incomeCategories;
                break;
            case 'expense':
                categories = expenseCategories;
                break;
            case 'transfer':
                categories = [];
                isTransfer = true;
                break;
        }

        return (
            <form
                className='transaction-edit-form'
            >
                <ToggleButtons
                    buttons={types}
                    value={transaction.type}
                    onChange={this.handleTypeChanged}
                />
                <div
                    className='dv-row'
                >
                    <div
                        className='dv-column-6'
                    >
                        <NumberInput
                            value={transaction.value}
                            placeholder={translations.value.placeholder}
                            className='transaction-form-input'
                            onChange={this.handleValueChanged}
                        />
                        <Select
                            items={accounts}
                            value={transaction.accountSource}
                            className='transaction-form-input'
                            onChange={this.handleAccountSourceChanged}
                        />
                        {isTransfer ? (
                            <Select
                                items={accounts}
                                value={transaction.accountDestination}
                                className='transaction-form-input'
                                onChange={this.handleAccountDestinationChanged}
                            />
                        ) : (
                            <Select
                                items={categories}
                                value={transaction.category}
                                className='transaction-form-input'
                                onChange={this.handleCategoryChanged}
                            />
                        )}
                        <TextArea
                            value={transaction.note}
                            placeholder={translations.note.placeholder}
                            className='transaction-form-input'
                            onChange={this.handleNoteChanged}
                        />
                    </div>
                    <div
                        className='dv-column-6'
                    >
                        <div
                            className='calendar-wrapper'
                        >
                            <Calendar
                                date={transaction.date}
                                onChange={this.handleDateChanged}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    className='transaction-save-button'
                    onClick={this.handleSaveClick}
                >
                    {translations.buttons.save}
                </Button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    const accounts = getSelectItemsData(getAccountsData(state));
    const incomeCategories = getSelectItemsData(getIncomeCategories(state));
    const expenseCategories = getSelectItemsData(getExpenseCategories(state));

    return {
        accounts,
        incomeCategories,
        expenseCategories
    };

    function getSelectItemsData(data) {
        return mapObjectToArray(data).map(entity => ({
            text: entity.name,
            value: entity._id
        }));
    }
}

export default connect(mapStateToProps)(withCookies(TransactionEditForm));
