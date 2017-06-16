import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import { paths } from 'routes'

import ProjectSelector from './ProjectSelector';

const propTypes = {
    translations: PropTypes.object
};

const defaultProps = {
    translations: {
        link: {
            home: 'Home',
            project: 'Project',
            currencies: 'Currencies',
        }
    }
};

function NavigationMenu({ translations }) {
    return (
        <div>
            <ProjectSelector/>
            <ul>
                <li>
                    <Link to={paths.home}>
                        {translations.link.home}
                    </Link>
                </li>
                <li>
                    <Link to={paths.project.list}>
                        {translations.link.project}
                    </Link>
                </li>
                <li>
                    <Link to={paths.project.currencies}>
                        {translations.link.currencies}
                    </Link>
                </li>
                <li>
                    <Link to={paths.project.currencies}>
                        {translations.link.settings}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

NavigationMenu.propTypes = propTypes;
NavigationMenu.defaultProps = defaultProps;

export default NavigationMenu;
