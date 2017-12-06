const paths = {
    home: {
        url: '/'
    },
    logout: {
        url: '/logout'
    },
    projects: {
        url: '/projects'
    },
    project: {
        url: '/project/:projectId',
        getUrl: projectId => paths.project.url.replace(':projectId', projectId),
        transactions: {
            url: 'transactions',
            getUrl: projectId => `${paths.project.getUrl(projectId)}/transactions`
        },
        settings: {
            url: 'settings',
            getUrl: projectId => `${paths.project.getUrl(projectId)}/settings`,
            accounts: {
                url: 'accounts',
                getUrl: projectId => `${paths.project.settings.getUrl(projectId)}/accounts`
            },
            categories: {
                url: 'categories',
                getUrl: projectId => `${paths.project.settings.getUrl(projectId)}/categories`
            },
            currencies: {
                url: 'currencies',
                getUrl: projectId => `${paths.project.settings.getUrl(projectId)}/currencies`
            },
        }
    }
};

export default paths;
