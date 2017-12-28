import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import {
    formatDate
} from './dateDisplayHelper';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./dateDisplay.scss');
}

class DateDisplay extends Component {
    static propTypes = {
        value: PropTypes.object,
        format: PropTypes.string
    };

    static defaultProps = {
        value: new Date(),
        format: 'dd.mm.yyyy'
    };

    render() {
        const {
            value,
            format
        } = this.props;

        return (
            <span>
                {formatDate(value, format)}
            </span>
        );
    }
}

export default DateDisplay;
