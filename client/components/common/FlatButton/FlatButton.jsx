import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./flatButton.scss');
}

const propTypes = {
    className: PropTypes.string
};

const defaultProps = {
    className: ''
};

function FlatButton(props) {
    const properties = Object.assign({}, props, {
        className: `mk-flat-button ${props.className}`.trim()
    });

    return (
        <Button {...properties} />
    );
}

FlatButton.propTypes = propTypes;
FlatButton.defaultProps = defaultProps;

export default FlatButton;
