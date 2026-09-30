/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import { useSwipeable } from 'react-swipeable';
import { Drawer, Toolbar } from '@material-ui/core';
import Logo from '@src/dist/shared/gear/logo';
import LoginBlock from './login-block';
import Menu from './menu';
import BtnLogout from './btn-logout';

import styles from './menu-drawer.scss';

type Props = {
  open: boolean,
  onClose: any
};

export default withStyle(styles)(({ open, onClose }: Props) => {
  const linkTo = useLinkTo();
  const swiped = useSwipeable({
    onSwipedRight: eventData => {
      onClose({}); //關閉側欄
    }
  });

  return (
    <Drawer anchor="right" open={open} onClose={onClose} {...swiped}>
      <div styleName="drawer">
        <Toolbar styleName="drawer-toolbar">
          <div styleName="flex-fill">
            <Logo type={'white'} />
          </div>
          <button
            type="button"
            styleName="btn btn-icon"
            aria-label="close"
            onClick={onClose}
            onKeyDown={onClose}>
            <span aria-hidden="true">
              <i class="fas fa-times"></i>
            </span>
          </button>
        </Toolbar>
        <div>
          {/*<div styleName="menu-login">
            <LoginBlock onClose={onClose} linkTo={linkTo} />
          </div>*/}
          <Menu onClose={onClose} linkTo={linkTo} />
          {/*<BtnLogout onClose={onClose} linkTo={linkTo} />*/}
        </div>
      </div>
    </Drawer>
  );
});
