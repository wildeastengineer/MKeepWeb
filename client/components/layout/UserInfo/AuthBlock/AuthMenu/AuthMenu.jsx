import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import { TextInput, Button } from 'components/common';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./authMenu.scss');
}

const propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    onCredentialsChange: PropTypes.func.isRequired,
    onLogInByPassClick: PropTypes.func.isRequired,
    onCreateNewAccountClick: PropTypes.func.isRequired,
    translations: PropTypes.object
};

const defaultProps = {
    translations: {
        placeholder: {
            email: 'E-mail',
            password: 'Password'
        },
        button: {
            logIn: 'Log In',
            createNew: 'Create New Account'
        },
        title: {
            wait: 'Please, wait...'
        }
    }
};

function AuthMenu(props) {
    const translations = props.translations;

    return (
        <div className='auth-menu'>
            <form className='auth-menu__by-pass-form'>
                <TextInput
                    value={props.email}
                    placeholder={translations.placeholder.email}
                    disabled={props.isLoading}
                    onChange={props.onCredentialsChange.bind(null, 'email')}
                />
                <TextInput
                    type='password'
                    value={props.password}
                    placeholder={translations.placeholder.password}
                    disabled={props.isLoading}
                    onChange={props.onCredentialsChange.bind(null, 'password')}
                />
                <Button
                    type='submit'
                    disabled={props.isLoading}
                    onClick={props.onLogInByPassClick}
                >
                    {translations.button.logIn}
                </Button>
                <span className='auth-menu__divider' />
                <Button
                    type='submit'
                    disabled={props.isLoading}
                    onClick={props.onCreateNewAccountClick}
                >
                    {translations.button.createNew}
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
                        {translations.title.wait}
                    </span>
                )}
            </form>
        </div>
    );
}

AuthMenu.propTypes = propTypes;
AuthMenu.defaultProps = defaultProps;

export default AuthMenu;
