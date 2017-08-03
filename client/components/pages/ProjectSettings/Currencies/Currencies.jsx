import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import config from 'config/config';
import { withCookies } from 'warehouse';

import { updateGlobalCurrencies, updateProjectCurrencies } from 'store/currencies/actions';
import { getGlobalCurrenciesList, getProjectCurrenciesList } from 'store/currencies/selectors';
import { getCurrentProjectId } from 'store/projects/selectors';
import { mapObjectToArray, without, pick } from 'store/helpers';

import CurrenciesList from './CurrenciesList';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./currencies.scss');
}

class Currencies extends Component {
    static propTypes = {
        projectId: PropTypes.string,
        globalCurrencies: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            sign: PropTypes.string,
            iso: PropTypes.string,
            name: PropTypes.string,
            country: PropTypes.string
        })),
        projectCurrencies: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            sign: PropTypes.string,
            iso: PropTypes.string,
            name: PropTypes.string,
            country: PropTypes.string
        })),
        translations: PropTypes.object,
        getCookies: PropTypes.func.isRequired,
        dispatch: PropTypes.func
    };

    static defaultProps = {
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

    addCurrencyButtonClickHandler = (currencyId) => {
        const cookies = this.props.getCookies();
        const {
            projectId,
            projectCurrencies
        } = this.props;
        const updatedProjectCurrencies = [...pick(projectCurrencies, '_id'), currencyId];

        this.props.dispatch(updateProjectCurrencies(projectId, updatedProjectCurrencies, cookies));
    };

    removeCurrencyButtonClickHandler = (currencyId) => {
        const cookies = this.props.getCookies();
        const {
            projectId,
            projectCurrencies
        } = this.props;
        const updatedProjectCurrencies = without(pick(projectCurrencies, '_id'), [currencyId]);

        this.props.dispatch(updateProjectCurrencies(projectId, updatedProjectCurrencies, cookies));
    };

    render() {
        const {
            globalCurrencies,
            projectCurrencies,
            translations
        } = this.props;

        return (
            <div className='currencies-settings'>
                <CurrenciesList
                    currencies={projectCurrencies}
                    actionTitle={translations.actions.remove}
                    onButtonClick={this.removeCurrencyButtonClickHandler}
                />
                <CurrenciesList
                    currencies={globalCurrencies}
                    actionTitle={translations.actions.add}
                    onButtonClick={this.addCurrencyButtonClickHandler}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const projectId = getCurrentProjectId(state);
    const projectCurrencies = mapObjectToArray(getProjectCurrenciesList(state));
    const globalCurrencies = without(mapObjectToArray(getGlobalCurrenciesList(state)), projectCurrencies, '_id');

    return {
        projectId,
        globalCurrencies,
        projectCurrencies
    };
}

export default connect(mapStateToProps)(withCookies(Currencies));
