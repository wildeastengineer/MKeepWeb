import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCookies } from 'warehouse';
import config from 'config/config';
import getLogger from 'logger';

import AccountsListItem from './AccountsListItem';
import AccountForm from './AccountForm';
import {
    AddEntityButton,
    Modal
} from 'components/common';

import {
    getAccountsList,
    createAccount,
    updateAccount,
    removeAccount
} from 'store/accounts/actions';

import {
    getAccounts
} from 'store/accounts/selectors';

import {
    mapObjectToArray
} from 'store/helpers';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./accountsList.scss');
}

const logger = getLogger('AccountsList');

class AccountsList extends Component {
    static propTypes = {
        projectId: PropTypes.string.isRequired,
        accounts: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string,
            value: PropTypes.number,
            initValue: PropTypes.number,
            currency: PropTypes.shape({
                sign: PropTypes.isRequired
            }).isRequired
        })),
        getCookies: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        translations: PropTypes.object
    };

    static defaultProps = {
        accounts: [],
        translations: {
            header: {
                name: 'Name',
                value: 'Current Value',
                initValue: 'Initial Value',
                currency: 'Currency'
            },
            modal: {
                create: 'Add New Account',
                update: 'Edit Account'
            }
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            currentAccount: {},
            modalIsOpen: false
        };
    }

    componentDidMount() {
        const projectId = this.props.projectId;
        const cookies = this.props.getCookies();

        if (projectId) {
            this.props.dispatch(getAccountsList(projectId, cookies));
        } else {
            logger.error('Project id is not defined');
        }
    }

    handleAddButtonClick = () => {
        this.setState({
            currentAccount: {},
            modalIsOpen: true
        });
    };

    handleEditClick = (accountId) => {
        const account = this.props.accounts.find(account => account._id === accountId);

        this.setState({
            currentAccount: {
                ...account,
                currency: account.currency._id
            },
            modalIsOpen: true
        });
    };

    handleRemoveClick = (accountId) => {
        const cookies = this.props.getCookies();
        const projectId = this.props.projectId;
        const account = this.props.accounts.find(account => account._id === accountId);

        if (projectId) {
            this.props.dispatch(removeAccount(projectId, account, cookies));
        } else {
            logger.error('Project id is not defined');
        }
    };

    handleSaveClick = (accountParams) => {
        const {
            dispatch,
            getCookies,
            projectId
        } = this.props;
        const cookies = getCookies();

        const {
            _id,
            ...accountData
        } = accountParams;

        if (_id) {
            dispatch(updateAccount(projectId, _id, accountData, cookies));
        } else {
            dispatch(createAccount(projectId, accountData, cookies));
        }

        this.setState({
            modalIsOpen: false
        });
    };

    handleModalCloseClick = () => {
        this.setState({
            modalIsOpen: false
        });
    };

    render() {
        const {
            accounts,
            translations
        } = this.props;
        const {
            currentAccount,
            modalIsOpen
        } = this.state;
        const accountFieldsToDisplay = [
            'name',
            'value',
            'initValue',
            'currency'
        ];
        const modalTitle = currentAccount._id ?
            translations.modal.update :
            translations.modal.create;

        return (
            <div className='accounts-list-wrapper'>
                <div className='accounts-list'>
                    <table>
                        <thead>
                        <tr>
                            {accountFieldsToDisplay.map((field) => (
                                <th key={field}>
                                    {translations.header[field]}
                                </th>
                            ))}
                            <th className='button-column'/>
                            <th className='button-column'/>
                        </tr>
                        </thead>
                        <tbody>
                        {accounts.map((account) => (
                            <AccountsListItem
                                key={account._id}
                                fieldsToDisplay={accountFieldsToDisplay}
                                onEditClick={this.handleEditClick}
                                onRemoveClick={this.handleRemoveClick}
                                {...account}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
                <AddEntityButton
                    className='add-account-button'
                    onClick={this.handleAddButtonClick}
                />
                {modalIsOpen && (
                    <Modal
                        title={modalTitle}
                        onCloseClick={this.handleModalCloseClick}
                    >
                        <AccountForm
                            {...currentAccount}
                            onSaveClick={this.handleSaveClick}
                        />
                    </Modal>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    let accounts = getAccounts(state);

    return {
        accounts: mapObjectToArray(accounts)
    };
}

export default connect(mapStateToProps)(withCookies(AccountsList));
