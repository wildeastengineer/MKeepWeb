import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./checkControl.scss');
}

const propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

const defaultProps = {
    className: '',
    disabled: false
};

function CheckControl(props) {
    const properties = Object.assign({}, props, {
        className: ''
    });

    return (
        <div
            className={`mk-check-control ${props.className}`.trim()}
        >
            <div
                className='mk-check-control__wrapper'
            >
            <input
                type='checkbox'
                {...properties}
            />
            </div>
        </div>
    );
}

CheckControl.propTypes = propTypes;
CheckControl.defaultProps = defaultProps;

export default CheckControl;
