import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./radioButton.scss');
}

const propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

const defaultProps = {
    className: '',
    disabled: false
};

function RadioButton(props) {
    const properties = Object.assign({}, props, {
        className: ''
    });

    return (
        <div
            className={`mk-radio-button ${props.className}`.trim()}
        >
            <div
                className='mk-radio-button__wrapper'
            >
                <input
                    type='radio'
                    {...properties}
                />
            </div>
        </div>
    );
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;
