import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProjectSelector from './ProjectSelector';
import NavigationButton from './NavigationButton';
import {
    AccountsInformer
} from 'components/entities/accounts';

import { paths } from 'routes';

import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./navigationMenu.scss');
}

class NavigationMenu extends Component {
    static propTypes = {
        currentProjectId: PropTypes.string,
        translations: PropTypes.object
    };

    static defaultProps = {
        currentProjectId: '',
        translations: {
            link: {
                home: 'Home',
                settings: 'Project'
            }
        }
    };

    render() {
        const {
            translations,
            currentProjectId
        } = this.props;

        // ToDo: Set current project data from URL when page refreshing

        return (
            <div
                className='navigation-menu'
            >
                <ProjectSelector/>
                {currentProjectId && (
                    <div>
                        <NavigationButton
                            name={translations.link.home}
                            url={paths.project.getUrl(currentProjectId)}
                            icon='dashboard'
                        />
                        <hr/>
                        <AccountsInformer
                            projectId={currentProjectId}
                        />
                        <hr/>
                        <NavigationButton
                            name={translations.link.settings}
                            url={paths.project.settings.getUrl(currentProjectId)}
                            icon='settings'
                        />
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const currentProjectData = state.projects.currentProject.data;

    return {
        currentProjectId: currentProjectData ? currentProjectData._id : ''
    };
}

export default connect(mapStateToProps)(NavigationMenu);
