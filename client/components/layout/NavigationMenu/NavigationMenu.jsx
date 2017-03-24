import React, { Component } from 'react';
import { Link } from 'react-router'

class NavigationMenu extends Component {
    render() {
        return (
            <div>
                Navigation Menu
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/project">
                            Project
                        </Link>
                    </li>
                    <li>
                        <Link to="/project/currencies">
                            Currencies
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavigationMenu;
