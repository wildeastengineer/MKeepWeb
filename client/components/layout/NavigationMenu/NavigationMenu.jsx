import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import { paths } from 'routes';

import ProjectSelector from './ProjectSelector';

const propTypes = {
    currentProjectId: PropTypes.string,
    translations: PropTypes.object
};

const defaultProps = {
    currentProjectId: '',
    translations: {
        link: {
            home: 'Home',
            settings: 'Project'
        }
    }
};

function NavigationMenu({ translations, currentProjectId }) {
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

NavigationMenu.propTypes = propTypes;
NavigationMenu.defaultProps = defaultProps;

export default NavigationMenu;
