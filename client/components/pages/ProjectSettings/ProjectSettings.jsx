import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { paths } from 'routes';
import { SettingsItemsList } from './SettingsNavigation';

const propTypes = {
    currentProjectId: PropTypes.string,
    translations: PropTypes.object,
    children: PropTypes.node
};

const defaultProps = {
    currentProjectId: '',
    translations: {
        links: {
            accounts: 'Accounts',
            categories: 'Categories',
            currencies: 'Currencies'
        }
    }
};

function ProjectSettings({ translations, currentProjectId, children }) {
    const settingsItems = [
        {
            url: paths.project.settings.categories.getUrl(currentProjectId),
            icon: 'folder',
            label: translations.links.categories
        },
        {
            url: paths.project.settings.accounts.getUrl(currentProjectId),
            icon: 'account_balance_wallet',
            label: translations.links.accounts
        },
        {
            url: paths.project.settings.currencies.getUrl(currentProjectId),
            icon: 'euro_symbol',
            label: translations.links.currencies
        }
    ];

    return (
        <div>
            <SettingsItemsList
                items={settingsItems}
            />
            <div>
                { children }
            </div>
        </div>
    );
}

ProjectSettings.propTypes = propTypes;
ProjectSettings.defaultProps = defaultProps;

function mapStateToProps(state) {
    const currentProjectData = state.projects.currentProject.data;

    return {
        currentProjectId: currentProjectData ? currentProjectData._id : ''
    };
}

export default connect(mapStateToProps)(ProjectSettings);
