import React from 'react';
import PropTypes from 'prop-types';

if (process.env.BROWSER) {
    require('./textInput.scss');
}

const propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

const defaultProps = {
    type: 'text',
    className: '',
    disabled: false
};

function TextInput(props) {
    const properties = Object.assign({}, props, {
        className: `mk-input ${props.className}`.trim()
    });

    return (
        <input {...properties}/>
    );
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
