/* @flow */
import React from 'react';
import { useDispatch } from 'react-redux';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import { logout } from '@src/libraries/axios-member-manager.js';

import styles from '../menu-drawer.scss';

/**
 * BtnLogout
 * @desc 登出按鈕
 */
export default withStyle(styles)(({ onClose, linkTo }) => {
  const dispatch = useDispatch();

  /* 登出 */
  const btnLogout = event => {
    /* 發api 清空使用者資料 */
    localStorage.removeItem('token');
    dispatch(logout());
    onClose({});
    if (window.location.pathname === '/member') linkTo('/')();
  };

  const isLogged = usePathSelector('user.isLogged', {});

  return isLogged ? (
    <div styleName="menu-logout">
      <div styleName="menu-login-btn">
        <button
          type="button"
          styleName="btn btn-outline-light"
          onClick={btnLogout}>
          登出
        </button>
      </div>
    </div>
  ) : null;
});
