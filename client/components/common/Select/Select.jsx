import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./select.scss');
}

class Select extends Component {
    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        items: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        })),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        emptyTitle: PropTypes.string
    };

    static defaultProps = {
        className: '',
        disabled: false,
        items: [],
        value: '',
        emptyTitle: '',
        onChange: () => {}
    };

    constructor(props) {
        super(props);
    }

    selectChangedHandler = (event) => {
        const value = event.target.value;

        if (!value) {
            return;
        }

        this.props.onChange(value);
    };

    render() {
        const {
            value,
            items,
            disabled,
            emptyTitle
        } = this.props;

        const className = `mk-select ${this.props.className}`.trim();
        const isEmpty = !items.length;

        return (
            <select
                value={value}
                className={className}
                disabled={disabled || isEmpty}
                onChange={this.selectChangedHandler}
            >
                {items.map((item) => (
                    <option
                        key={item.value}
                        value={item.value}
                    >
                        {item.text}
                    </option>
                ))}
                {isEmpty && (
                    <option
                        value=''
                    >
                        {emptyTitle}
                    </option>
                )}
            </select>
        );
    }
}

export default Select;
