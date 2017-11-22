import React, { Component }  from 'react';
import PropTypes from 'prop-types';

import config from 'config/config';

import {
    FlatButton,
    Icon,
    Money
} from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./accountsListItem.scss');
}

class AccountsListItem extends Component {
    static propTypes = {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string,
        value: PropTypes.number,
        initValue: PropTypes.number,
        currency: PropTypes.shape({
            sign: PropTypes.isRequired
        }).isRequired,
        fieldsToDisplay: PropTypes.arrayOf(PropTypes.string),
        onEditClick: PropTypes.func,
        onRemoveClick: PropTypes.func
    };

    static defaultProps = {
        name: 'New Account',
        value: 0,
        initValue: 0,
        fieldsToDisplay: []
    };

    constructor(props) {
        super(props);

        this.getFieldMarkup = this.getFieldMarkup.bind(this);
    }

    editClickHandler = () => {
        this.props.onEditClick(this.props._id);
    };

    removeClickHandler = () => {
        this.props.onRemoveClick(this.props._id);
    };

    getFieldMarkup(fieldName) {
        let field;

        switch (fieldName) {
            case 'value':
            case 'initValue':
                field = (
                    <Money
                        value={this.props[fieldName]}
                    />
                );
                break;
            case 'currency':
                field = this.props[fieldName].sign;
                break;
            default:
                field = this.props[fieldName];
        }

        return (
            <td
                key={fieldName}
                className={`account-list-item__account-${fieldName}`}
            >
                {field}
            </td>
        );
    }

    render() {
        const {
            fieldsToDisplay
        } = this.props;

        return (
            <tr className='account-list-item'>
                { fieldsToDisplay.map(this.getFieldMarkup) }
                <td className='button-cell'>
                    <FlatButton onClick={this.editClickHandler}>
                        <Icon icon='edit'/>
                    </FlatButton>
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

export default AccountsListItem;
