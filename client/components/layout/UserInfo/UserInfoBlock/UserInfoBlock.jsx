import React, { Component } from 'react';

import { logInByEmail } from 'store/actions/authActions';

import { FlatButton, Icon, PopupMenu } from 'components/common';
import UserInfoMenu from './UserInfoMenu';

class UserInfoBlock extends Component {
    render() {
        return (
            <div className='user-info-block'>
                <PopupMenu
                    button={(
                        <FlatButton>
                            <Icon icon='person'/>
                        </FlatButton>
                    )}
                >
                    <UserInfoMenu />
                </PopupMenu>
            </div>
        );
    }
}

export default UserInfoBlock;

