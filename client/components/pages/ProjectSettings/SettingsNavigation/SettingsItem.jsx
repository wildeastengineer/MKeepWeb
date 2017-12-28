import React  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'

import { Icon } from 'components/common';

const propTypes = {
    url: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string
};

const defaultProps = {
    url: '#',
    icon: 'not_interested',
    label: 'Label Not Defined'
};

function SettingsItem({ url, icon, label }) {
    return (
        <Link
            className='mk-settings-item'
            activeClassName='mk-settings-item_active'
            to={url}
        >
            <Icon
                icon={icon}
            />
            <span>{label}</span>
        </Link>
    );
}

SettingsItem.propTypes = propTypes;
SettingsItem.defaultProps = defaultProps;

export default SettingsItem;
