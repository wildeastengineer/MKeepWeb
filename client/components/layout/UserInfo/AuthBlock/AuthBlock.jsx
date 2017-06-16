import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logInByEmail, runRegistrationFlow } from 'store/auth/actions';

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
        event.preventDefault();

        this.props.dispatch(logInByEmail(this.state.email, this.state.password));
    };

    handleCreateNewAccountClick = (event) => {
        event.preventDefault();

        this.props.dispatch(runRegistrationFlow(this.state.email, this.state.password));
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

export default connect(mapStateToProps)(AuthBlock);
