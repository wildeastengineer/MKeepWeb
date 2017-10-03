import PropTypes from 'prop-types';

class Currency {
    static propTypes = {
        _id: PropTypes.string.isRequired,
        sign: PropTypes.isRequired,
        name: PropTypes.isRequired,
        iso: PropTypes.string,
        country: PropTypes.string
    };

    static defaultProps = {
        iso: '',
        country: ''
    };
}

export default Currency;
