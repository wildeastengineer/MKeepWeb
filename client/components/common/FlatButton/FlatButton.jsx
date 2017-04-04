import React from 'react';
import { Button } from '../';

if (process.env.BROWSER) {
    require('./flatButton.scss');
}

function FlatButton(props) {
    const properties = Object.assign({}, props, {
        className: `mk-flat-button ${props.className}`.trim()
    });

    return (
        <Button {...properties} />
    );
}

export default FlatButton;

