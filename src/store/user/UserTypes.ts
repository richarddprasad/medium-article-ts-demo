export interface IUser {
    username: string | undefined;
    userMessage: string | undefined;
    friendList?: string[] | undefined;
}

export const UserActions = {
    SAVE_USERNAME: 'SAVE_USERNAME',
    SAVE_USER_MESSAGE: 'SAVE_USER_MESSAGE',
    SAVE_FRIENDS: 'SAVE_FRIENDS',
}

interface ISaveUsernameAction {
    type: typeof UserActions.SAVE_USERNAME,
    payload: IUser | string[]
}

interface ISaveUserMessageAction {
    type: typeof UserActions.SAVE_USER_MESSAGE,
    payload: IUser | string[]
}

interface ISaveFriendsAction {
    type: typeof UserActions.SAVE_FRIENDS,
    payload: IUser | string[]
}

export type IUserActionTypes = ISaveUsernameAction | 
    ISaveUserMessageAction |
    ISaveFriendsAction;