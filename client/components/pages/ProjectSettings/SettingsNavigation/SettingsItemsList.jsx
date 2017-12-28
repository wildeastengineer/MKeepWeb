import React  from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import { SettingsItem } from '../SettingsNavigation' ;

if (config.isBuilding) {
    /*eslint-env node*/
    require('./settingsNavigation.scss');
}

const propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        icon: PropTypes.string,
        label: PropTypes.string
    }))
};

const defaultProps = {
    items: []
};

function SettingsItemsList({ items }) {
    return (
        <div
            className='mk-settings-items-list'
        >
            {items.map((item) => (
                <SettingsItem
                    key={item.url}
                    {...item}
                />
            ))}
        </div>
    );
}

SettingsItemsList.propTypes = propTypes;
SettingsItemsList.defaultProps = defaultProps;

export default SettingsItemsList;
