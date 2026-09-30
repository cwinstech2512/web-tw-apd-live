/* @flow */
import React, { Fragment } from 'react';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import styles from '../menu-drawer.scss';

/**
 * LoginBlock
 * @desc 判斷是否登入，顯示Hello畫面或登入按鈕
 */
export default withStyle(styles)(({ onClose, linkTo }) => {
  /* 連到登入頁 */
  const openLogin = event => {
    linkTo('/login')();
    onClose({});
  };

  /* 連到修改資料頁 */
  const openEdit = event => {
    linkTo('/member')();
    onClose({});
  };

  const user = usePathSelector('user', {});

  return user.isLogged ? (
    <Fragment>
      {user.avatar === '' ? (
        <div styleName="menu-login-icon" style={{ lineHeight: '4.2rem' }}>
          <span aria-hidden="true">
            <i class="fas fa-user-circle"></i>
          </span>
        </div>
      ) : (
        <div
          styleName="menu-avatar"
          style={{ backgroundImage: `url(${user.avatar})` }}
        />
      )}
      <div styleName="menu-member-block">
        <div styleName="menu-member-name">
          Hi! {user.nickname || user.name || user.account || ''}
        </div>
        <button
          type="button"
          styleName="btn btn-outline-light btn-sm"
          onClick={openEdit}>
          <span aria-hidden="true" styleName="mr-1">
            <i class="fas fa-cog"></i>
          </span>
          修改個人資料
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div styleName="menu-login-icon" onClick={openLogin}>
        <span aria-hidden="true">
          <i class="fas fa-user-circle"></i>
        </span>
      </div>
      <div styleName="menu-login-btn">
        <button
          type="button"
          styleName="btn btn-outline-light"
          onClick={openLogin}>
          登入 / 註冊
        </button>
      </div>
    </Fragment>
  );
});
