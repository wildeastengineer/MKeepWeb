import React from 'react';
import PropTypes from 'prop-types';

import TabsListItem from './TabsListItem';

const propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string),
    currentTab: PropTypes.number,
    onClick: PropTypes.func
};

const defaultProps = {
    tabs: []
};

function TabsList({
                      tabs,
                      currentTab,
                      onClick
                  }) {
    return (
        <ul
            className='mk-tabs-list'
        >
            {tabs.map((tab, index) => (
                <TabsListItem
                    key={tab}
                    name={tab}
                    active={index === currentTab}
                    index={index}
                    onClick={onClick}
                />
            ))}
        </ul>
    );
}

TabsList.propTypes = propTypes;
TabsList.defaultProps = defaultProps;

export default TabsList;
