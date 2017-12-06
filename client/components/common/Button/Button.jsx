import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./button.scss');
}

const propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node
};

const defaultProps = {
    type: 'button',
    className: '',
    active: false,
    disabled: false,
    size: 'medium'
};

function Button(props) {
    const properties = Object.assign({}, props, {
        className: `mk-button ${props.className}`.trim()
    });

    switch (properties.size) {
        case 'small':
            properties.className += ' mk-button-small';
    }

    if (properties.active) {
        properties.className += ' mk-button-active';
    }

    delete properties.active;

    return (
        <button {...properties}>
            <span>
                {props.children}
            </span>
        </button>
    );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
