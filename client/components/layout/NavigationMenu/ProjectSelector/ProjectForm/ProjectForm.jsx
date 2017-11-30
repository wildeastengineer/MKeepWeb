import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config/config';

import {
    Button,
    TextInput
} from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./projectForm.scss');
}

class CategoryForm extends Component {
    static propTypes = {
        onSaveClick: PropTypes.func,
        translations: PropTypes.object
    };

    static defaultProps = {
        onSaveClick: () => {},
        translations: {
            namePlaceholder: 'Project name',
            save: 'Save'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            project: {
                name: ''
            }
        };
    }

    handleSaveProjectClick = () => {
        this.props.onSaveClick(this.state.project);
    };

    handleInputChanged = (field, event) => {
        const value = event.hasOwnProperty('target') ?
            event.target.value :
            event;

        this.setState({
            project: {
                ...this.state.project,
                [field]: value
            }
        });
    };

    handleNameChanged = this.handleInputChanged.bind(null, 'name');

    render() {
        const {
            project
        } = this.state;
        const {
            translations
        } = this.props;

        return (
            <form
                className='project-form'
            >
                <TextInput
                    value={project.name}
                    placeholder={translations.namePlaceholder}
                    onChange={this.handleNameChanged}
                />
                <Button
                    onClick={this.handleSaveProjectClick}
                >
                    {translations.save}
                </Button>
            </form>
        );
    }
}

export default CategoryForm;
