import React  from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    translations: PropTypes.object
};

const defaultProps = {
    translations: {
        title: 'Currencies'
    }
};

function Currencies({ translations }) {
    return (
        <div>
            {translations.title}
        </div>
    );
}

Currencies.propTypes = propTypes;
Currencies.defaultProps = defaultProps;

export default Currencies;
