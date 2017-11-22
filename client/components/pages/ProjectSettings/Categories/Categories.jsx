import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config/config';

import CategoriesList from './CategoriesList';
import {
    Tab,
    Tabs
} from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./categories.scss');
}

class Categories extends Component {
    static propTypes = {
        params: PropTypes.shape({
            projectId: PropTypes.string
        }),
        translations: PropTypes.object
    };

    static defaultProps = {
        params: {},
        translations: {}
    };

    render() {
        const {
            params,
            translations
        } = this.props;
        const projectId = params.projectId;

        return (
            <div className='categories-settings'>
                <Tabs
                    className='category-types-tabs'
                >
                    <Tab
                        name={translations.types.income}
                    >
                        <CategoriesList
                            projectId={projectId}
                            categoriesType='income'
                        />
                    </Tab>
                    <Tab
                        name={translations.types.expense}
                    >
                        <CategoriesList
                            projectId={projectId}
                            categoriesType='expense'
                        />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Categories;
