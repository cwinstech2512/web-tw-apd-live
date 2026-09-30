/* @flow */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLinkTo } from '@core/hooks';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import { Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { logout } from '@src/libraries/axios-member-manager';
import styles from './login-block.scss';

export default withStyle(styles)(({ white }) => {
  const dispatch = useDispatch();
  const linkTo = useLinkTo();
  const user = usePathSelector('user', {});

  /* 登出 */
  const btnLogout = event => {
    /* 發api 清空使用者資料 */
    localStorage.removeItem('token');
    dispatch(logout());
    if (window.location.pathname === '/member') linkTo('/')();
  };

  return user.isLogged ? (
    <div styleName={`logged ${white ? 'white' : ''}`}>
      <Button styleName="logged-btn logged-btn-hi" onClick={linkTo('/member')}>
        {user.avatar === '' ? (
          <AccountCircle styleName="logged-icon" />
        ) : (
          <div
            styleName="logged-avatar"
            style={{ backgroundImage: `url(${user.avatar})` }}
          />
        )}{' '}
        Hello!
      </Button>
      <Button styleName="logged-btn" onClick={btnLogout}>
        登出
      </Button>
    </div>
  ) : (
    <Button onClick={linkTo('/login')} styleName="login-btn" color="inherit">
      <AccountCircle styleName="login-btn-icon" /> 登入/註冊
    </Button>
  );
});
