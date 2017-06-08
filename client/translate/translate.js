import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function translate(languages) {
    return Component => {
        class TranslationComponent extends React.Component {
            static propTypes = {
                currentLanguage: PropTypes.string
            };

            render() {
                const currentLanguage = this.props.currentLanguage;
                const translations = languages[currentLanguage];

                return <Component {...this.props} {...this.state} translations={translations}/>;
            }
        }

        function mapStateToProps(state) {
            return {
                currentLanguage: state.user.language
            };
        }

        return connect(mapStateToProps)(TranslationComponent);
    };
}
