import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeProfileLanguage } from 'store/auth/actions'
import { FlagIcon, PopupMenu } from 'components/common';
import config from 'config';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./languageSelector.scss');
}

const propTypes = {
    availableLanguages: PropTypes.arrayOf(PropTypes.string),
    currentLanguage: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

const defaultProps = {
    availableLanguages: [
        'ru',
        'en'
    ]
};

function LanguageSelector ({ availableLanguages, currentLanguage, dispatch }) {
    return (
        <div className='language-selector'>
            <PopupMenu
                button={(
                    <FlagIcon
                        country={currentLanguage}
                        className='language-selector_button'
                    />
                )}
            >
                <div className='language-selector_list'>
                    {availableLanguages.map((language) => (
                        <FlagIcon
                            key={language}
                            country={language}
                            className='language-selector_button'
                            onClick={() => { dispatch(changeProfileLanguage(language)) }}
                        />
                    ))}
                </div>
            </PopupMenu>
        </div>
    );
}

LanguageSelector.propTypes = propTypes;
LanguageSelector.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {
        currentLanguage: state.user.language
    };
}

export default connect(mapStateToProps)(LanguageSelector);
