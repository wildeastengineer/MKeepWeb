import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import { paths } from 'routes'

const propTypes = {
    translations: PropTypes.object
};

const defaultProps = {
    translations: {
        title: 'Navigation Menu',
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
            {translations.title}
            <ul>
                <li>
                    <Link to={paths.home}>
                        {translations.link.home}
                    </Link>
                </li>
                <li>
                    <Link to={paths.projects.list}>
                        {translations.link.project}
                    </Link>
                </li>
                <li>
                    <Link to={paths.projects.currencies}>
                        {translations.link.currencies}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

NavigationMenu.propTypes = propTypes;
NavigationMenu.defaultProps = defaultProps;

export default NavigationMenu;
