import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import { FlatButton } from '../';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./addEntityButton.scss');
}

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

const defaultProps = {
    className: '',
    disabled: false
};

function AddEntityButton(props) {
    const properties = Object.assign({}, props, {
        className: `mk-add-entity-button ${props.className}`.trim()
    });

    return (
        <FlatButton {...properties}>
            +
        </FlatButton>
    );
}

AddEntityButton.propTypes = propTypes;
AddEntityButton.defaultProps = defaultProps;

export default AddEntityButton;
