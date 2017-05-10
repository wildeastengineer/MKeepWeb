import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { FlatButton, Icon, PopupMenu } from 'components/common';
import UserInfoMenu from './UserInfoMenu';

class UserInfoBlock extends Component {
    static propTypes = {
        userName: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        userName: ''
    };

    handleLogoutClick = () => {
        this.props.dispatch(push('/logOut'));
    };

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
                    <UserInfoMenu
                        userName={this.props.userName}
                        onLogoutClick={this.handleLogoutClick}
                    />
                </PopupMenu>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userName: state.user.profile.name
    };
}

export default connect(mapStateToProps)(UserInfoBlock);
