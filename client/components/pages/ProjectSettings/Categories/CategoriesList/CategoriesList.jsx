import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCookies } from 'warehouse';
import config from 'config/config';
import getLogger from 'logger';

import CategoriesListItem from './CategoriesListItem';
import CategoryForm from './CategoryForm';
import {
    AddEntityButton,
    Modal
} from 'components/common';

import {
    getCategoriesList,
    createCategory,
    updateCategory,
    removeCategory
} from 'store/categories/actions';

import {
    getIncomeCategories,
    getExpenseCategories
} from 'store/categories/selectors';

import {
    mapObjectToArray
} from 'store/helpers';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./categoriesList.scss');
}

const logger = getLogger('CategoriesList');

class CategoriesList extends Component {
    static propTypes = {
        projectId: PropTypes.string.isRequired,
        categoriesType: PropTypes.oneOf(['income', 'expense']),
        categories: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string.isRequired,
            parent: PropTypes.object
        })),
        getCookies: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        translations: PropTypes.object
    };

    static defaultProps = {
        categories: [],
        translations: {
            header: {
                name: 'Name',
                parent: 'Parent'
            },
            modal: {
                create: 'Add New Category',
                update: 'Edit Category'
            }
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            currentCategory: {},
            modalIsOpen: false
        };
    }

    componentDidMount() {
        const projectId = this.props.projectId;
        const cookies = this.props.getCookies();

        if (projectId) {
            this.props.dispatch(getCategoriesList(projectId, cookies));
        } else {
            logger.error('Project id is not defined');
        }
    }

    handleAddButtonClick = () => {
        const { categoriesType } = this.props;

        this.setState({
            currentCategory: {
                type: categoriesType
            },
            modalIsOpen: true
        });
    };

    handleEditClick = (categoryId) => {
        const category = this.props.categories.find((category) => (category._id === categoryId));

        this.setState({
            currentCategory: {
                _id: category._id,
                name: category.name,
                type: category.type,
                parent: category.parent ? category.parent._id : ''
            },
            modalIsOpen: true
        });
    };

    handleRemoveClick = (categoryId) => {
        const cookies = this.props.getCookies();
        const projectId = this.props.projectId;
        const category = this.props.categories.find(category => category._id === categoryId);

        if (projectId) {
            this.props.dispatch(removeCategory(projectId, category, cookies));
        } else {
            logger.error('Project id is not defined');
        }
    };

    handleSaveClick = (categoryParams) => {
        const {
            dispatch,
            getCookies,
            projectId
        } = this.props;
        const cookies = getCookies();

        const {
            _id,
            ...categoryData
        } = categoryParams;

        if (_id) {
            dispatch(updateCategory(projectId, _id, categoryData, cookies));
        } else {
            dispatch(createCategory(projectId, categoryData, cookies));
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
            categories,
            translations
        } = this.props;
        const {
            currentCategory,
            modalIsOpen
        } = this.state;
        const categoryFieldsToDisplay = [
            'name',
            'parent'
        ];
        const modalTitle = currentCategory._id ?
            translations.modal.update :
            translations.modal.create;

        return (
            <div className='categories-list-wrapper'>
                <div className='categories-list'>
                    <table>
                        <thead>
                        <tr>
                            {categoryFieldsToDisplay.map((field) => (
                                <th key={field}>
                                    {translations.header[field]}
                                </th>
                            ))}
                            <th className='button-column'/>
                            <th className='button-column'/>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((category) => (
                            <CategoriesListItem
                                key={category._id}
                                onEditClick={this.handleEditClick}
                                onRemoveClick={this.handleRemoveClick}
                                {...category}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
                <AddEntityButton
                    className='add-category-button'
                    onClick={this.handleAddButtonClick}
                />
                {modalIsOpen && (
                    <Modal
                        title={modalTitle}
                        onCloseClick={this.handleModalCloseClick}
                    >
                        <CategoryForm
                            {...currentCategory}
                            onSaveClick={this.handleSaveClick}
                        />
                    </Modal>
                )}
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    let categories;

    switch (props.categoriesType) {
        case 'income':
            categories = getIncomeCategories(state);
            break;
        case 'expense':
            categories = getExpenseCategories(state);
            break;
        default:
            categories = [];
    }

    return {
        categories: mapObjectToArray(categories)
    };
}

export default connect(mapStateToProps)(withCookies(CategoriesList));
