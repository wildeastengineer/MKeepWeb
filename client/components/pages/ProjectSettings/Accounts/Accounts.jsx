import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config/config';

import AccountsList from './AccountsList';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./accounts.scss');
}

class Accounts extends Component {
    static propTypes = {
        params: PropTypes.shape({
            projectId: PropTypes.string
        })
    };

    static defaultProps = {
        params: {}
    };

    render() {
        const {
            params
        } = this.props;
        const projectId = params.projectId;

        return (
            <div className='accounts-settings'>
                <AccountsList
                    projectId={projectId}
                />
            </div>
        );
    }
}

export default Accounts;
