import React  from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    translations: PropTypes.object
};

const defaultProps = {
    translations: {
        title: 'Categories'
    }
};

function Categories({ translations }) {
    return (
        <div>
            {translations.title}
        </div>
    );
}

Categories.propTypes = propTypes;
Categories.defaultProps = defaultProps;

export default Categories;
