import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Button
} from 'components/common';

class ToggleButton extends Component {
    static propTypes = {
        icon: PropTypes.string,
        text: PropTypes.string,
        value: PropTypes.any,
        active: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        icon: null,
        text: '',
        value: null,
        active: false,
        onClick: () => {}
    };

    handleButtonClicked = () => {
        const {
            value,
            onClick
        } = this.props;

        onClick(value);
    };

    render() {
        const {
            active,
            text
        } = this.props;

        return (
            <Button
                active={active}
                className='mk-toggle-button'
                onClick={this.handleButtonClicked}
            >
                {text}
            </Button>
        );
    }
}

export default ToggleButton;
