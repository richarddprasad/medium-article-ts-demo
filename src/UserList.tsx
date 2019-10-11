import React, { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IAppState } from './store/RootReducer';
import { getFriendList as getFriendListAction } from './store/user/UserActions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IUser } from './store/user/UserTypes';

const CenterContent = styled.div`
    text-align: center;
`;

interface IUserListOwnProps {

}

interface IUserListStateToProps {
    user: IUser
}

interface IUserListDispatchToProps {
    getFriendList: (url: string) => void;
}

type IUserList = IUserListStateToProps & IUserListDispatchToProps & IUserListOwnProps;

const UserListUnconnected: React.FC<IUserList> = 
({
    user,
    getFriendList
}): JSX.Element => {
    const [fetchFriends, setFetchFriends] = useState<boolean>(true);

    useEffect(() => {
        if( fetchFriends ) {
            getFriendList('https://jsonplaceholder.typicode.com/users');
            setFetchFriends(false);
        }
    }, [fetchFriends, getFriendList]);

    let friendListJsx: JSX.Element | undefined = undefined;
    if(user.friendList) {
        friendListJsx = (
            <ul>
                {user.friendList.map((friend) => <li key={friend}>{friend}</li>)}
            </ul>
        )
    }

    return (
        <CenterContent>
            <p>
                Retrieved Username: {user.username ? user.username : 'No username found'}
            </p>
            <p>
                Retrieved User Message: {user.userMessage ? user.userMessage : 'No message found'}
            </p>
            <p>
                UserList
            </p>
            <Link
                to='/'
            >
                Home
            </Link>
            <h3>
                Friend List
            </h3>
            {friendListJsx ? friendListJsx : null}
        </CenterContent>
    );
}

const mapStateToProps: MapStateToProps<
    IUserListStateToProps,
    IUserListOwnProps,
    IAppState
> = (state: IAppState, ownProps: IUserListOwnProps): IUserListStateToProps => ({
    user: state.user,
    ...ownProps
});

const mapDispatchToProps: MapDispatchToProps<
    IUserListDispatchToProps,
    IUserListOwnProps
> = (dispatch: ThunkDispatch<{}, {}, AnyAction>, ownProps: IUserListOwnProps) => ({
    getFriendList: async (url: string) => {
        dispatch(getFriendListAction(url));
    }
});

export const UserList = connect<
    IUserListStateToProps,
    IUserListDispatchToProps,
    IUserListOwnProps,
    IAppState
>(mapStateToProps, mapDispatchToProps)(UserListUnconnected);