import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./select.scss');
}

const propTypes = {
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

const defaultProps = {
    className: '',
    disabled: false,
    items: [],
    emptyTitle: ''
};

const selectChangedHandler = (onChange, e) => {
    onChange(e.target.value);
};

function Select(props) {
    const className = `mk-select ${props.className}`.trim();
    const isEmpty = !props.items.length;

    return (
        <select
            value={props.value}
            className={className}
            disabled={props.disabled || isEmpty}
            onChange={selectChangedHandler.bind(null, props.onChange)}
        >
            {!isEmpty && props.items.map((item) => (
                <option
                    key={item.value}
                    value={item.value}
                >
                    {item.text}
                </option>
            ))}
            {isEmpty && (
                <option>
                    {props.emptyTitle}
                </option>
            )}
        </select>
    );
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
