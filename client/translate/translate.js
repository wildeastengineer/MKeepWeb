import React from 'react';
import PropTypes from 'prop-types';

export default function translate(languages) {
    return Component => {
        class TranslationComponent extends React.Component {
            render() {
                const currentLanguage = 'en'; //this.context.currentLanguage
                const translations = languages[currentLanguage];

                return <Component {...this.props} {...this.state} translations={translations}/>;
            }
        }

        TranslationComponent.contextTypes = {
            currentLanguage: PropTypes.string
        };

        return TranslationComponent;
    };
}
