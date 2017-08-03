import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CookiesComponentWrapper = (ComponentToWrap) => {
    return class CookiesComponent extends Component {
        static contextTypes = {
            getCookies: PropTypes.func.isRequired,
        };

        render() {
            const { getCookies } = this.context;

            return (
                <ComponentToWrap {...this.props} getCookies={getCookies} />
            );
        }
    };
};

export default CookiesComponentWrapper;