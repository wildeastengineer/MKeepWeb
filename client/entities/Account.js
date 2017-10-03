import PropTypes from 'prop-types';
import Currency from './Currency';

class Account {
    static propTypes = {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string,
        value: PropTypes.number,
        initValue: PropTypes.number,
        currency: PropTypes.shape(Currency.propTypes).isRequired
    };

    static defaultProps = {
        name: 'New Account',
        value: 0,
        initValue: 0,
    };
}

export default Account;
