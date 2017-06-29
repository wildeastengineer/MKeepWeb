import React  from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    translations: PropTypes.object
};

const defaultProps = {
    translations: {
        title: 'Accounts'
    }
};

function Accounts({ translations }) {
    return (
        <div>
            {translations.title}
        </div>
    );
}

Accounts.propTypes = propTypes;
Accounts.defaultProps = defaultProps;

export default Accounts;
