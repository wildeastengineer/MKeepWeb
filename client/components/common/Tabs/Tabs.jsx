import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import TabsList from './TabsList';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./tabs.scss');
}

const getTabNamesFromChildren = (children) => {
    const names = [];

    for (let i = 0; i < children.length; i++) {
        names.push(children[i].props.name || `Tab ${i + 1}`);
    }

    return names;
};

class Tabs extends Component {
    state = {
        open: false
    };

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    };

    static defaultProps = {
        className: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            tabs: [],
            currentTab: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tabs: getTabNamesFromChildren(nextProps.children)
        });
    }

    handleTabClick = (number) => {
        this.setState({
            currentTab: number
        });
    };

    render() {
        const {
            children,
            className
        } = this.props;
        const {
            tabs,
            currentTab
        } = this.state;
        const currentChild = children.length ? children[currentTab] : null;

        const tabsClassName = `mk-tabs ${className}`.trim();

        return (
            <div className={tabsClassName}>
                <TabsList
                    tabs={tabs}
                    currentTab={currentTab}
                    onClick={this.handleTabClick}
                />
                {currentChild}
            </div>
        );
    }
}

export default Tabs;
