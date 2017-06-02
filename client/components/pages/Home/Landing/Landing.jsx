import React from 'react';
import PropTypes from 'prop-types';

function Landing({ translations }) {
    return (
        <div>
            { translations.welcome }
        </div>
    );
}

Landing.propTypes = {
    translations: PropTypes.object
};

Landing.defaultProps = {
    translations: {
        welcome: 'Welcome'
    }
};

export default Landing;
