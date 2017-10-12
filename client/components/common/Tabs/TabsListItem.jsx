import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    active: PropTypes.bool,
    index: PropTypes.number,
    onClick: PropTypes.func
};

const defaultProps = {
    name: ''
};

function TabsListItem({
                          name,
                          active,
                          index,
                          onClick
                      }) {
    let className = 'mk-tabs-list-item';

    if (active) {
        className += ' active';
    }

    return (
        <li
            className={className}
            onClick={() => { onClick(index); }}
        >
            {name}
        </li>
    );
}

TabsListItem.propTypes = propTypes;
TabsListItem.defaultProps = defaultProps;

export default TabsListItem;
