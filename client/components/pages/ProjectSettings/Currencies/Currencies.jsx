import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import config from 'config/config';
import { withCookies } from 'warehouse';

import {
    updateGlobalCurrencies,
    updateProjectCurrencies,
    updateProjectMainCurrency
} from 'store/currencies/actions';

import {
    getGlobalCurrenciesList,
    getProjectCurrenciesList,
    getMainCurrencyId
} from 'store/currencies/selectors';

import {
    getCurrentProjectId
} from 'store/projects/selectors';

import {
    mapObjectToArray,
    without,
    pick
} from 'store/helpers';

import CurrenciesList from './CurrenciesList';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./currencies.scss');
}

class Currencies extends Component {
    static propTypes = {
        projectId: PropTypes.string,
        globalCurrencies: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            sign: PropTypes.isRequired,
            name: PropTypes.isRequired,
            iso: PropTypes.string,
            country: PropTypes.string
        })),
        projectCurrencies: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            sign: PropTypes.isRequired,
            name: PropTypes.isRequired,
            iso: PropTypes.string,
            country: PropTypes.string
        })),
        translations: PropTypes.object,
        getCookies: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        projectId: null,
        globalCurrencies: [],
        projectCurrencies: [],
        translations: {
            actions: {
                add: 'Add',
                remove: 'Remove'
            }
        }
    };

    componentDidMount() {
        const cookies = this.props.getCookies();

        this.props.dispatch(updateGlobalCurrencies(cookies));
    }

    handleUseControlChange = (id, isUsed) => {
        if (isUsed) {
            this.removeCurrency(id);
        } else {
            this.addCurrency(id);
        }
    };

    handleSetDefaultControlChange = (id) => {
        this.setMainCurrency(id);
    };

    addCurrency(currencyId) {
        const cookies = this.props.getCookies();
        const {
            projectId,
            projectCurrencies
        } = this.props;
        const updatedProjectCurrencies = [...pick(projectCurrencies, '_id'), currencyId];

        this.props.dispatch(updateProjectCurrencies(projectId, updatedProjectCurrencies, cookies));
    }

    removeCurrency(currencyId) {
        const cookies = this.props.getCookies();
        const {
            projectId,
            projectCurrencies,
            dispatch
        } = this.props;
        const updatedProjectCurrencies = without(pick(projectCurrencies, '_id'), [currencyId]);

        dispatch(updateProjectCurrencies(projectId, updatedProjectCurrencies, cookies));
    }

    setMainCurrency(currencyId) {
        const cookies = this.props.getCookies();
        const {
            projectId,
            dispatch
        } = this.props;

        dispatch(updateProjectMainCurrency(projectId, currencyId, cookies));
    }

    render() {
        const {
            globalCurrencies,
            projectCurrencies
        } = this.props;

        return (
            <div className='currencies-settings'>
                <CurrenciesList
                    currencies={projectCurrencies}
                    onUseControlChange={this.handleUseControlChange}
                    onSetDefaultControlChange={this.handleSetDefaultControlChange}
                />
                <CurrenciesList
                    currencies={globalCurrencies}
                    onUseControlChange={this.handleUseControlChange}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const projectId = getCurrentProjectId(state);
    const mainCurrencyId = getMainCurrencyId(state);
    let projectCurrencies;
    let globalCurrencies;

    projectCurrencies = mapObjectToArray(getProjectCurrenciesList(state));
    projectCurrencies = projectCurrencies.map((currency) => (Object.assign({}, currency, {
        isUsed: true,
        isDefault: currency._id === mainCurrencyId
    })));

    globalCurrencies = without(mapObjectToArray(getGlobalCurrenciesList(state)), projectCurrencies, '_id');

    return {
        projectId,
        projectCurrencies,
        globalCurrencies
    };
}

export default connect(mapStateToProps)(withCookies(Currencies));
