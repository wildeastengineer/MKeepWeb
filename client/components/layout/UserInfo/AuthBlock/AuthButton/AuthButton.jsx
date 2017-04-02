import React, { Component, PropTypes } from 'react';
import { Button } from 'components/common';

const propTypes = {
    onClick: PropTypes.func.isRequired
};

const AuthButton = (props) => {
    return (
        <Button onClick={props.onClick}>Log In</Button>
    );
};

AuthButton.propTypes = propTypes;

export default AuthButton;

