import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from 'config/config';

import {
    getIncomeCategories,
    getExpenseCategories
} from 'store/categories/selectors';

import {
    getCurrentProjectId
} from 'store/projects/selectors';

import {
    mapObjectToArray
} from 'store/helpers';

import {
    Button,
    Select,
    TextInput
} from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./categoryForm.scss');
}

class CategoryForm extends Component {
    static propTypes = {
        _id: PropTypes.string,
        name: PropTypes.string,
        parent: PropTypes.string,
        type: PropTypes.string,
        incomeCategories: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string.isRequired,
            parent: PropTypes.object
        })),
        expenseCategories: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string.isRequired,
            parent: PropTypes.object
        })),
        onSaveClick: PropTypes.func,
        translations: PropTypes.object
    };

    static defaultProps = {
        name: '',
        parent: '',
        type: 'expense',
        onSaveClick: () => {},
        translations: {
            namePlaceholder: 'Category name',
            type: {
                income: 'Income',
                expense: 'Expense'
            },
            noParentCategory: 'No parent category',
            save: 'Save'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            category: {
                _id: props._id,
                name: props.name,
                type: props.type,
                parent: props.parent
            },
            isLoading: false
        };
    }

    handleSaveCategoryClick = () => {
        this.props.onSaveClick(this.state.category);
    };

    handleInputChanged = (field, event) => {
        const value = event.hasOwnProperty('target') ?
            event.target.value :
            event;

        this.setState({
            category: {
                ...this.state.category,
                [field]: value
            }
        });
    };

    handleNameChanged = this.handleInputChanged.bind(null, 'name');
    handleTypeChanged = this.handleInputChanged.bind(null, 'type');
    handleParentChanged = this.handleInputChanged.bind(null, 'parent');

    render() {
        const {
            category,
            isLoading
        } = this.state;
        const {
            translations
        } = this.props;

        const types = [
            {
                text: translations.type.income,
                value: 'income'
            },
            {
                text: translations.type.expense,
                value: 'expense'
            }
        ];

        const parentCategories = (
            category.type === 'income' ?
                this.props.incomeCategories :
                this.props.expenseCategories
        ).map(category => ({
            text: category.name,
            value: category._id
        }));

        parentCategories.unshift({
            text: translations.noParentCategory,
            value: ''
        });

        return (
            <form
                className='category-form'
            >
                <TextInput
                    value={category.name}
                    placeholder={translations.namePlaceholder}
                    disabled={isLoading}
                    onChange={this.handleNameChanged}
                />
                <Select
                    value={category.type}
                    items={types}
                    onChange={this.handleTypeChanged}
                />
                <Select
                    value={category.parent}
                    items={parentCategories}
                    onChange={this.handleParentChanged}
                    emptyTitle='Select parent category'
                />
                <Button
                    onClick={this.handleSaveCategoryClick}
                >
                    {translations.save}
                </Button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    const projectId = getCurrentProjectId(state);
    const incomeCategories = mapObjectToArray(getIncomeCategories(state));
    const expenseCategories = mapObjectToArray(getExpenseCategories(state));

    return {
        projectId,
        incomeCategories,
        expenseCategories
    };
}

export default connect(mapStateToProps)(CategoryForm);
