import { Component, Children } from 'react';
import PropTypes from 'prop-types';

class CookiesProvider extends Component {
    static propTypes = {
        cookies: PropTypes.object.isRequired,
        children: PropTypes.element
    };

    static childContextTypes = {
        getCookies: PropTypes.func.isRequired,
    };

    getCookies = () => {
        return this.props.cookies;
    };

    getChildContext() {
        return {
            getCookies: this.getCookies
        };
    }

    render() {
        return Children.only(this.props.children);
    }
}

export default CookiesProvider;
