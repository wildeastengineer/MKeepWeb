import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import config from 'config';
import { withCookies } from 'warehouse';
import {
    mapObjectToArray
} from 'store/helpers';
import {
    setCurrentProject,
    createProject
} from 'store/projects/actions'
import {
    getCurrentProjectId,
    getProjectsList
} from 'store/projects/selectors'

import {
    Modal,
    Select
} from 'components/common';
import ProjectForm from './ProjectForm';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./projectSelector.scss');
}

class ProjectSelector extends Component {
    static propTypes = {
        projects: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            value: PropTypes.string
        })),
        currentProjectId: PropTypes.string,
        translations: PropTypes.object,
        getCookies: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        projects: [],
        translations: {
            create: 'New',
            emptyList: 'No Projects',
            modalTitle: 'Create New Project'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            selectItems: this.getSelectItems(props)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectItems: this.getSelectItems(nextProps)
        })
    }

    getSelectItems(props) {
        return props.projects.concat([{
            text: props.translations.create,
            value: 'create_new_project'
        }])
    }

    handleProjectsListChange = (projectId) => {
        if (projectId === 'create_new_project') {
            return this.handleCreateProjectButtonClick();
        }

        const cookies = this.props.getCookies();

        this.props.dispatch(setCurrentProject(projectId, cookies));
    };

    handleCreateProjectButtonClick = () => {
        this.setState({
            modalIsOpen: true
        });
    };

    handleModalCloseClick = () => {
        this.setState({
            modalIsOpen: false
        });
    };

    handleSaveClick = (projectParams) => {
        const {
            dispatch,
            getCookies
        } = this.props;
        const cookies = getCookies();

        dispatch(createProject(projectParams, cookies));

        this.setState({
            modalIsOpen: false
        });
    };

    render() {
        const {
            currentProjectId,
            translations
        } = this.props;
        const {
            modalIsOpen,
            selectItems
        } = this.state;

        return (
            <div
                className='project-selector'
            >
                <Select
                    items={selectItems}
                    value={currentProjectId}
                    emptyTitle={translations.emptyList}
                    onChange={this.handleProjectsListChange}
                />
                {modalIsOpen && (
                    <Modal
                        title={translations.modalTitle}
                        onCloseClick={this.handleModalCloseClick}
                    >
                        <ProjectForm
                            onSaveClick={this.handleSaveClick}
                        />
                    </Modal>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const projects = mapObjectToArray(getProjectsList(state));
    const projectsList = projects.map((project) => ({
        text: project.name,
        value: project._id
    }));
    const currentProjectId = getCurrentProjectId(state) || '';

    return {
        projects: projectsList,
        currentProjectId
    };
}

export default connect(mapStateToProps)(withCookies(ProjectSelector));
