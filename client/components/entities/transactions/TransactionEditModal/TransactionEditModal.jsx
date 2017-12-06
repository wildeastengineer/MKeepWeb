import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config/config';

import {
    Modal
} from 'components/common';

import {
    TransactionEditForm
} from 'components/entities/transactions';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./transaction-edit-modal.scss');
}

class TransactionEditModal extends Component {
    static propTypes = {
        projectId: PropTypes.string.isRequired,
        onCloseRequest: PropTypes.func,
        transaction: PropTypes.object,
        translations: PropTypes.object
    };

    static defaultProps = {
        onCloseRequest: () => {},
        transaction: {},
        translations: {
            title: {
                create: 'Create New Transaction',
                edit: 'Edit Transaction'
            }
        }
    };

    render() {
        const {
            projectId,
            onCloseRequest,
            transaction,
            translations
        } = this.props;

        const modalTitle = transaction._id ? translations.title.edit : translations.title.create;

        return (
            <Modal
                title={modalTitle}
                className='transaction-edit-modal'
            >
                <TransactionEditForm
                    projectId={projectId}
                    onCloseRequest={onCloseRequest}
                    transaction={transaction}
                />
            </Modal>
        );
    }
}

export default TransactionEditModal;
