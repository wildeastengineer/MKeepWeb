import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from 'config/config';

import {
    getCurrentProjectId
} from 'store/projects/selectors';

import {
    getMainCurrency,
    getProjectCurrenciesList
} from 'store/currencies/selectors';

import {
    mapObjectToArray
} from 'store/helpers';

import {
    Button,
    NumberInput,
    Select,
    TextInput
} from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./accountForm.scss');
}

class CategoryForm extends Component {
    static propTypes = {
        _id: PropTypes.string,
        name: PropTypes.string,
        initValue: PropTypes.number,
        currency: PropTypes.string,
        availableCurrencies: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string
        })),
        mainCurrency: PropTypes.shape({
            _id: PropTypes.string
        }),
        onSaveClick: PropTypes.func,
        translations: PropTypes.object
    };

    static defaultProps = {
        name: '',
        onSaveClick: () => {},
        translations: {
            namePlaceholder: 'Account name',
            initValue: 'Initial value',
            currency: 'Currency'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            account: {
                _id: props._id,
                name: props.name,
                initValue: props.initValue || 0,
                currency: props.currency || props.mainCurrency._id
            },
            isLoading: false
        };
    }

    handleSaveAccountClick = () => {
        this.props.onSaveClick(this.state.account);
    };

    handleInputChanged = (field, event) => {
        let value = event.hasOwnProperty('target') ?
            event.target.value :
            event;

        this.setState({
            account: {
                ...this.state.account,
                [field]: value
            }
        });
    };

    handleNameChanged = this.handleInputChanged.bind(null, 'name');
    handleInitValueChanged = this.handleInputChanged.bind(null, 'initValue');
    handleCurrencyChanged = this.handleInputChanged.bind(null, 'currency');

    render() {
        const {
            account,
            isLoading
        } = this.state;
        const {
            translations,
            availableCurrencies
        } = this.props;
        const currencies = availableCurrencies.map(currency => ({
            text: `${currency.sign} - ${currency.name}`,
            value: currency._id
        }));

        return (
            <form
                className='account-form'
            >
                <TextInput
                    value={account.name}
                    placeholder={translations.namePlaceholder}
                    disabled={isLoading}
                    onChange={this.handleNameChanged}
                />
                <NumberInput
                    value={account.initValue}
                    placeholder={translations.initValue}
                    disabled={isLoading}
                    onChange={this.handleInitValueChanged}
                />
                <Select
                    value={account.currency}
                    items={currencies}
                    onChange={this.handleCurrencyChanged}
                    emptyTitle='Select currency'
                />
                <Button
                    onClick={this.handleSaveAccountClick}
                >
                    Save
                </Button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    const projectId = getCurrentProjectId(state);
    const availableCurrencies = mapObjectToArray(getProjectCurrenciesList(state));
    const mainCurrency = getMainCurrency(state);

    return {
        projectId,
        availableCurrencies,
        mainCurrency
    };
}

export default connect(mapStateToProps)(CategoryForm);
