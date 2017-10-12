import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    FlatButton,
    Icon
} from 'components/common';

import config from 'config/config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./categoriesListItem.scss');
}


class CategoriesListItem extends Component {
    static propTypes = {
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string.isRequired,
        parent: PropTypes.object,
        onEditClick: PropTypes.func,
        onRemoveClick: PropTypes.func
    };
    static defaultProps = {
        name: 'New Category',
        parent: null,
    };

    editClickHandler = () => {
        this.props.onEditClick(this.props._id);
    };

    removeClickHandler = () => {
        this.props.onRemoveClick(this.props._id);
    };

    render() {
        const name = this.props.name;
        const parentName = this.props.parent ? this.props.parent.name : '';

        return (
            <tr className='categories-list-item'>
                <td className='categories-list-item__category-name'>
                    {name}
                </td>
                <td className='categories-list-item__category-parent'>
                    {parentName}
                </td>
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

export default CategoriesListItem;
