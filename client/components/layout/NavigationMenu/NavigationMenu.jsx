import React, { Component } from 'react';
import { Link } from 'react-router'

import { paths } from 'routes';

class NavigationMenu extends Component {
    render() {
        return (
            <div>
                Navigation Menu
                <ul>
                    <li>
                        <Link to={paths.home}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={paths.projects.list}>
                            Project
                        </Link>
                    </li>
                    <li>
                        <Link to={paths.projects.currencies}>
                            Currencies
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavigationMenu;
