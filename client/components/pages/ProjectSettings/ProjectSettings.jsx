import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { paths } from 'routes';
import { Link } from 'react-router'

const propTypes = {
    currentProjectId: PropTypes.string,
    translations: PropTypes.object,
    children: PropTypes.node
};

const defaultProps = {
    currentProjectId: '',
    translations: {
        title: 'Project Settings',
        link: {
            currencies: 'Currencies'
        }
    }
};

function ProjectSettings({ translations, currentProjectId, children }) {
    return (
        <div>
            <h1>
                {translations.title}
            </h1>
            <div>
                <Link to={paths.project.settings.currencies.getUrl(currentProjectId)}>
                    {translations.link.currencies}
                </Link>
            </div>
            <div>
                { children }
            </div>
        </div>
    );
}

ProjectSettings.propTypes = propTypes;
ProjectSettings.defaultProps = defaultProps;

function mapStateToProps(state) {
    const currentProjectData = state.projects.currentProject.data;

    return {
        currentProjectId: currentProjectData ? currentProjectData._id : ''
    };
}

export default connect(mapStateToProps)(ProjectSettings);
