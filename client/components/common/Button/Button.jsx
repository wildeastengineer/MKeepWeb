import React, { PropTypes } from 'react';

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

function Button(props) {
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
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;

