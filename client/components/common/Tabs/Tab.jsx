import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node
};

const defaultProps = {};

function Tab({
                 children
             }) {

    return (
        <div
            className='mk-tab'
        >
            {children}
        </div>
    );
}

Tab.displayName = 'Tab';
Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;
