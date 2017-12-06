import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./textArea.scss');
}

class TextArea extends Component {
    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        type: 'text',
        className: '',
        disabled: false
    };

    textChangedHandler = (event) => {
        const value = event.target.value;

        this.props.onChange(value);
    };

    render() {
        const properties = Object.assign({}, this.props, {
            className: `mk-area ${this.props.className}`.trim(),
            onChange: this.textChangedHandler
        });

        return (
            <textarea {...properties}/>
        );
    }
}

export default TextArea;
