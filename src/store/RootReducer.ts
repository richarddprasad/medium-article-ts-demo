import { combineReducers, Reducer } from 'redux';
import { IUser } from "./user/UserTypes";
import { userReducer } from './user/UserReducer';

export interface IAppState {
    user: IUser,
    friendList: string[],
}

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
    user: userReducer
} as any);