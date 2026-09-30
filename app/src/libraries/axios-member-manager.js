import axios from 'axios';
import { emit } from '@core/action/effects';
import {
  USER_PROFILE,
  USER_LOGGED,
  USER_RESTORE
} from '@src/storage/reducers/user';
import { push } from 'connected-react-router';
import { has } from 'ramda';

const memberUrl = CONFIG.REMOTE.MEMBER_URL;
const memberEnabled =
  CONFIG.REMOTE.MEMBER_ENABLED &&
  Boolean(CONFIG.REMOTE.MEMBER_URL) &&
  Boolean(CONFIG.REMOTE.TOKEN_1_KEY);

const getToken = () => {
  if (!memberEnabled) return '';
  const random = Math.random()
    .toString(36)
    .substring(0, 5);
  const timestamp = Math.floor(Date.now() / 1000);
  const key = CONFIG.REMOTE.TOKEN_1_KEY;
  const token =
    random + btoa(random + timestamp.toString() + key) + '&' + timestamp;
  return token;
};

const memberInstance = axios.create({
  baseURL: memberUrl,
  header: {
    authorization: `Bearer ${getToken()}`
  }
});

export const thirdPartySetToken = (token: string) => {
  if (token) {
    memberInstance.defaults.headers['authorization'] = `Bearer ${token}`;
  }
};

export const setToken = (token: string = '') => {
  memberInstance.defaults.headers['authorization'] = `Bearer ${token ||
    getToken()}`;
};

// 處理資料的方式
export const queryGetMember = (query: string) =>
  !memberEnabled
    ? Promise.resolve({ success: false, data: {}, disabled: true })
    : memberInstance
    .get(query)
    .then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data
        };
      }
    })
    .catch(error => {
      localStorage.removeItem('token');
      console.log('queryGetMember error', error);
      return { success: false, data: {} };
    });

/* 第三方登入 */
export const getUserProfile = async token => {
  try {
    const { success, data = {} } = await queryGetMember(`/api/profile`);
    if (!success) return null;
    return emit(USER_PROFILE, { ...data, isLogged: true, token });
  } catch (err) {
    console.error(err);
  }
};

/* 登出 */
export const logout = async () => {
  try {
    const { data = {} } = await queryGetMember(`/api/logout`);
    return emit(USER_RESTORE);
  } catch (err) {
    console.error(err);
  }
};

// 處理資料的方式
export const queryPostMember = (query: string, params: Object) =>
  !memberEnabled
    ? Promise.resolve({ success: false, data: {}, disabled: true })
    : memberInstance
    .post(query, params)
    .then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: {
            ...res.data,
            errorCode: has('error')(res.data) ? res.data.error.code : 0
          }
        };
      }
    })
    .catch(error => {
      console.log('queryPostMember error', error);
      return { success: false, data: {} };
    });

/* 註冊 */
export const register = async (params: Object) => {
  try {
    const {
      success,
      data: { token, errorCode }
    } = await queryPostMember(`/api/register`, params);
    if (!success) return null;
    return [
      emit(USER_LOGGED, { token, errorCode }),
      ...(errorCode === 0 ? [push('/member?token=' + token)] : [])
    ];
  } catch (err) {
    console.error(err);
  }
};

/* 登入 */
export const login = async (params: Object) => {
  try {
    const {
      success,
      data: { token, errorCode }
    } = await queryPostMember(`/api/login`, params);
    if (!success) return null;
    return [
      emit(USER_LOGGED, { token, errorCode }),
      ...(errorCode === 0 ? [push('/member')] : [])
    ];
  } catch (err) {
    console.error(err);
  }
};

/* 修改資料 */
export const editProfile = async (params: Object) => {
  try {
    const { success, data } = await queryPostMember(`/api/profile`, {
      ...params,
      _method: 'patch'
    });
    if (!success) return null;
    return emit(USER_PROFILE, { ...data });
  } catch (err) {
    console.error(err);
  }
};

/* 修改密碼 */
export const changePwd = async ({ old_password, new_password }: Object) => {
  try {
    const {
      success,
      data: { errorCode = 0 }
    } = await queryPostMember(`/api/password`, {
      old_password,
      new_password,
      _method: 'patch'
    });
    if (!success) return null;
    return emit(USER_PROFILE, { errorCode });
  } catch (err) {
    console.error(err);
  }
};
