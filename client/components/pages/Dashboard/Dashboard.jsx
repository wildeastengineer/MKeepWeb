import React  from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    translations: PropTypes.object
};

const defaultProps = {
    translations: {
        title: 'Dashboard'
    }
};

function Dashboard({ translations }) {
    return (
        <div>
            {translations.title}
        </div>
    );
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default Dashboard;
