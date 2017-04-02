import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { logInByEmail } from 'store/actions/authActions';

import AuthButton from './AuthButton';
import AuthMenu from './AuthMenu';

if (process.env.BROWSER) {
    require('./authBlock.scss');
}

const propTypes = {
    authInProgress: PropTypes.bool,
    authError: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

const defaultProps = {
    authInProgress: false,
    authError: ''
};

class AuthBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showMenu: false
        };

        this.handleAuthButtonClick = this.handleAuthButtonClick.bind(this);
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this);
        this.handleLogInByPassClick = this.handleLogInByPassClick.bind(this);
    }

    handleAuthButtonClick() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    handleCredentialsChange(param, event) {
        this.setState({
            [param]: event.target.value
        });
    }

    handleLogInByPassClick(event) {
        event.preventDefault();

        this.props.dispatch(logInByEmail(this.state.email, this.state.password));
    }

    render() {
        return (
            <div className='auth-block'>
                <AuthButton
                    onClick={this.handleAuthButtonClick}
                />
                {this.state.showMenu && (
                    <AuthMenu
                        email={this.state.email}
                        password={this.state.password}
                        isLoading={this.props.authInProgress}
                        error={this.props.authError}
                        onCredentialsChange={this.handleCredentialsChange}
                        onLogInByPassClick={this.handleLogInByPassClick}
                    />
                )}
            </div>
        );
    }
}

AuthBlock.propTypes = propTypes;
AuthBlock.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {
        authInProgress: state.user.fetching.inProgress,
        authError: state.user.fetching.error
    };
}

export default connect(mapStateToProps)(AuthBlock);

