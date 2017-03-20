import React, { Component, PropTypes } from 'react';

if (process.env.BROWSER) {
    require('./layout.css');
}

const propTypes = {
    children: PropTypes.node
};

class App extends Component {
    render() {
        return (
            <div className='app-layout'>
                <div className='app-layout__header'>
                    header
                </div>
                <div className='app-layout__body'>
                    <div className='app-layout__side-bar'>
                        side bar
                    </div>
                    <div className='app-layout__content'>
                        {this.props.children}
                    </div>
                </div>
                <div className='app-layout__footer'>
                    footer
                </div>
            </div>
        );
    }
}

App.propTypes = propTypes;

export default App;
