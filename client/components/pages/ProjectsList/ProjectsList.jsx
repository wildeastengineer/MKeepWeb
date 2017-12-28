import React  from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    translations: PropTypes.object
};

const defaultProps = {
    translations: {
        title: 'Projects List'
    }
};

function ProjectsList({ translations }) {
    return (
        <div>
            {translations.title}
        </div>
    );
}

ProjectsList.propTypes = propTypes;
ProjectsList.defaultProps = defaultProps;

export default ProjectsList;
