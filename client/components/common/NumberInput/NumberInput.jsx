import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./numberInput.scss');
}

class NumberInput extends Component {
    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        type: PropTypes.oneOf([
            'number',
            'float'
        ]),
        className: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        value: '',
        className: '',
        type: 'float',
        disabled: false,
        onChange: () => {}
    };

    clickHandler = () => {
        this.input.select();
    };

    changeHandler = (event) => {
        let value;

        value = event.target.value;

        switch (this.props.type) {
            case 'number':
                value = parseInt(value, 10);
                break;
            case 'float':
                value = parseFloat(value);
                break;
        }

        this.props.onChange(value || null);
    };

    render() {
        const {
            id,
            placeholder,
            disabled,
            value
        } = this.props;

        const className = `mk-input-number ${this.props.className}`.trim();

        const parsedValue = typeof value === 'number' ? value : '';

        return (
            <input
                type='number'
                id={id}
                value={parsedValue}
                placeholder={placeholder}
                disabled={disabled}
                className={className}
                onClick={this.clickHandler}
                onChange={this.changeHandler}
                ref={input => this.input = input}
            />
        );
    }
}

export default NumberInput;
