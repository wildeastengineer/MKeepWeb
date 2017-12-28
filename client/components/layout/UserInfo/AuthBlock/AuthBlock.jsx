import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withCookies } from 'warehouse';
import { logInByEmail, createNewAccount } from 'store/auth/actions';

import { Button, PopupMenu } from 'components/common';
import AuthMenu from './AuthMenu';

class AuthBlock extends Component {
    state = {
        email: '',
        password: ''
    };

    static propTypes = {
        authInProgress: PropTypes.bool,
        authError: PropTypes.string,
        translations: PropTypes.object,
        getCookies: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        authInProgress: false,
        authError: '',
        translations: {
            logIn: 'Log In'
        }
    };

    handleCredentialsChange = (param, event) => {
        this.setState({
            [param]: event.target.value
        });
    };

    handleLogInByPassClick = (event) => {
        const { dispatch } = this.props;
        const { email, password } = this.state;
        const cookies = this.props.getCookies();

        event.preventDefault();

        dispatch(logInByEmail(email, password, cookies));
    };

    handleCreateNewAccountClick = (event) => {
        const { dispatch } = this.props;
        const { email, password } = this.state;
        const cookies = this.props.getCookies();

        event.preventDefault();

        dispatch(createNewAccount(email, password, cookies));
    };

    render() {
        return (
            <div className='auth-block'>
                <PopupMenu
                    button={(
                        <Button>
                            { this.props.translations.logIn }
                        </Button>
                    )}
                >
                    <AuthMenu
                        email={this.state.email}
                        password={this.state.password}
                        isLoading={this.props.authInProgress}
                        error={this.props.authError}
                        onCredentialsChange={this.handleCredentialsChange}
                        onLogInByPassClick={this.handleLogInByPassClick}
                        onCreateNewAccountClick={this.handleCreateNewAccountClick}
                    />
                </PopupMenu>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authInProgress: state.user.authorization.inProgress,
        authError: state.user.authorization.error
    };
}

export default connect(mapStateToProps)(withCookies(AuthBlock));
