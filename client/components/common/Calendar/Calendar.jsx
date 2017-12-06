import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import InfiniteCalendar from 'react-infinite-calendar';

if (config.isBuilding) {
    /*eslint-env node*/
    require('react-infinite-calendar/styles.css');
    require('./textArea.scss');
}

class Calendar extends Component {
    static propTypes = {
        date: PropTypes.object,
        onChange: PropTypes.func
    };

    static defaultProps = {
        date: new Date(),
        onChange: () => {}
    };

    render() {
        const {
            date,
            onChange
        } = this.props;

        return (
            <InfiniteCalendar
                width={250}
                height={250}
                selected={date}
                displayOptions={{
                    showHeader: false
                }}
                onSelect={onChange}
                theme={{
                    selectionColor: '#88b04b',
                    textColor: {
                        default: '#333',
                        active: '#FFF'
                    },
                    headerColor: '#88b04b',
                    weekdayColor: '#88b04b',
                    floatingNav: {
                        background: 'rgba(81, 67, 138, 0.96)',
                        color: '#FFF',
                        chevron: '#88b04b'
                    }
                }}
            />
        );
    }
}

export default Calendar;
