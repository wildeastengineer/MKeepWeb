import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import config from 'config';
import getLogger from 'logger';
import { setCurrentProject } from 'store/projects/actions'

import { Button, Select } from 'components/common';

const logger = getLogger('ProjectSelector');

if (config.isBuilding) {
    /*eslint-env node*/
    require('./projectSelector.scss');
}

class ProjectSelector extends Component {
    static propTypes = {
        projects: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        })),
        currentProjectId: PropTypes.string,
        translations: PropTypes.object,
        dispatch: PropTypes.func
    };

    static defaultProps = {
        projects: [],
        translations: {
            create: 'New',
            emptyList: 'No Projects'
        }
    };

    constructor(props) {
        super(props);
    }

    handleProjectsListChange = (projectId) => {
        logger.trace('Project changed');
        logger.trace(projectId);

        this.props.dispatch(setCurrentProject(projectId));
    };

    handleCreateProjectButtonClick = () => {
        logger.trace('Create new project');
    };

    render() {
        logger.trace('Render projects:');
        logger.trace(this.props.projects);

        return (
            <div
                className='project-selector'
            >
                <Select
                    items={this.props.projects}
                    value={this.props.currentProjectId}
                    emptyTitle={this.props.translations.emptyList}
                    onChange={this.handleProjectsListChange}
                />
                <Button
                    onClick={this.handleCreateProjectButtonClick}
                >
                    {this.props.translations.create}
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const projects = state.projects.projectsList.map((project) => ({
        text: project.name,
        value: project._id
    }));

    return {
        projects,
        currentProjectId: state.projects.currentProject.data ? state.projects.currentProject.data._id : ''
    };
}

export default connect(mapStateToProps)(ProjectSelector);
