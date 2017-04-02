import React, { Component, PropTypes } from 'react';

if (process.env.BROWSER) {
    require('./button.scss');
}

const propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node
};

const defaultProps = {
    type: 'button',
    className: '',
    disabled: false
};

const Input = (props) => {
    const properties = Object.assign({}, props, {
        className: `mk-button ${props.className}`.trim()
    });

    return (
        <button {...properties}>
            <span>
                {props.children}
            </span>
        </button>
    );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;

