import React, { PropTypes } from 'react';
import { TextInput, Button } from 'components/common';

if (process.env.BROWSER) {
    require('./authMenu.scss');
}

const propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    onCredentialsChange: PropTypes.func.isRequired,
    onLogInByPassClick: PropTypes.func.isRequired,
    onCreateNewAccountClick: PropTypes.func.isRequired
};

function AuthMenu(props) {
    return (
        <div className='auth-menu'>
            <form className='auth-menu__by-pass-form'>
                <TextInput
                    value={props.email}
                    placeholder='E-mail'
                    disabled={props.isLoading}
                    onChange={props.onCredentialsChange.bind(null, 'email')}
                />
                <TextInput
                    type='password'
                    value={props.password}
                    placeholder='Password'
                    disabled={props.isLoading}
                    onChange={props.onCredentialsChange.bind(null, 'password')}
                />
                <Button
                    type='submit'
                    disabled={props.isLoading}
                    onClick={props.onLogInByPassClick}
                >
                    Log In
                </Button>
                <span className='auth-menu__divider' />
                <Button
                    type='submit'
                    disabled={props.isLoading}
                    onClick={props.onCreateNewAccountClick}
                >
                    Create New Account
                </Button>
                {!!props.error && (
                    <span
                        className='auth-menu__error-message'
                        title={props.error}
                    >
                        {props.error}
                    </span>
                )}
                {!!props.isLoading && (
                    <span
                        className='auth-menu__wait-message'
                    >
                        Please, wait...
                    </span>
                )}
            </form>
        </div>
    );
}

AuthMenu.propTypes = propTypes;

export default AuthMenu;

