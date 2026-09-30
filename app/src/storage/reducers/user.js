/* @flow */
import { reducerCreator } from '@core/reducer';

/* action type */
export const USER_PROFILE = 'USER_PROFILE';
export const USER_LOGGED = 'USER_LOGGED';
export const USER_RESTORE = 'USER_RESTORE';

type State = {
  isLogged: boolean,
  type: 'local' | 'facebook' | 'google' | 'yahoo' | 'line',
  account: string,
  name: string,
  nickname: string,
  email: string,
  avatar: string
};

/**
 * 使用者登入資料
 */
export const defaultState = {
  isLogged: false,
  token: '',
  type: '',
  account: '',
  name: '',
  nickname: '',
  email: '',
  avatar: '',
  errorCode: -1
};

export default reducerCreator(defaultState, {
  [USER_PROFILE]: (preState, state) => {
    return { ...preState, ...state };
  },

  [USER_LOGGED]: (preState, { token, errorCode }) => {
    return { ...preState, token, errorCode, isLogged: true };
  },

  [USER_RESTORE]: () => defaultState
});
