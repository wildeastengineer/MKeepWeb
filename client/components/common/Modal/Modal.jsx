import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import {
    FlatButton,
    Icon
} from '../';

if (config.isBuilding) {
    /*eslint-env node*/
    require('./modal.scss');
}

const propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onCloseClick: PropTypes.func
};

const defaultProps = {
    onCloseClick: () => {}
};

function Modal({
                   title,
                   children,
                   onCloseClick
               }) {
    return (
        <div
            className='modal-window'
        >
            <div
                className='modal-window__header'
            >
                <div
                    className='modal-window__title'
                >
                    { title }
                </div>
                <FlatButton
                    size='small'
                    className='modal-window__close-button'
                    onClick={onCloseClick}
                >
                    <Icon
                        icon='close'
                    />
                </FlatButton>
            </div>
            <div
                className='modal-window__body'
            >
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
