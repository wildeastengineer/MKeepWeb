import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { paths } from 'routes';

import ProjectSelector from './ProjectSelector';

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

        // ToDo: Set current propject data from URL when page refreshing

        return (
            <div>
                <ProjectSelector/>
                {currentProjectId && (
                    <ul>
                        <li>
                            <Link to={paths.project.getUrl(currentProjectId)}>
                                {translations.link.home}
                            </Link>
                        </li>
                        <li>
                            <Link to={paths.project.settings.getUrl(currentProjectId)}>
                                {translations.link.settings}
                            </Link>
                        </li>
                    </ul>
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
