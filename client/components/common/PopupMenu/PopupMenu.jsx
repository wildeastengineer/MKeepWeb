import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getLogger from 'logger';

import { logInByEmail } from 'store/actions/authActions';

const logger = getLogger('PopupMenu');

if (process.env.BROWSER) {
    require('./popupMenu.scss');
}

class PopupMenu extends Component {
    state = {
        open: false
    };

    static propTypes = {
        button: PropTypes.element,
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.string
        ]),
        align: PropTypes.shape({
            horizontal: PropTypes.oneOf(['left', 'right'])
        })
    };

    static defaultProps = {
        align: {
            horizontal: 'right'
        }
    };

    handleAuthButtonClick = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    };

    render() {
        const { align } = this.props;
        const menuStyle = {};

        switch (align.horizontal) {
            case 'left':
                menuStyle.left = 0;
                break;
            case 'right':
                menuStyle.right = 0;
                break;
            default:
                logger.error(`Unknown horizontal alignment "${align.horizontal}" for "PopupMenu" component`);
        }

        return (
            <div className='popup-menu'>
                <div className='popup-menu__button'
                     onClick={this.handleAuthButtonClick}>
                    {this.props.button}
                </div>
                {this.state.open && (
                    <div className='popup-menu__body'
                         style={menuStyle}>
                        {this.props.children}
                    </div>
                )}
            </div>
        );
    }
}

export default PopupMenu;
