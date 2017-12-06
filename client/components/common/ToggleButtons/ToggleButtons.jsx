import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import ToggleButton from './ToggleButton';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./toggleButtons.scss');
}

class ToggleButtons extends Component {
    static propTypes = {
        buttons: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string,
            text: PropTypes.string,
            value: PropTypes.any
        })),
        value: PropTypes.any,
        onChange: PropTypes.func.isRequired
    };

    handleButtonClicked = (newValue) => {
        const {
            value,
            onChange
        } = this.props;

        if (newValue !== value) {
            onChange(newValue);
        }
    };

    render() {
        const {
            buttons,
            value
        } = this.props;

        return (
            <div
                className='mk-toggle-buttons'
            >
                {buttons.map(button => (
                    <ToggleButton
                        {...button}
                        key={button.value}
                        active={button.value === value}
                        className='mk-toggle-button'
                        onClick={this.handleButtonClicked}
                    />
                ))}
            </div>
        );
    }
}

export default ToggleButtons;
