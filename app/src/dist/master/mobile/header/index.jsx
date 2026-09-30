/* @flow */
import React from 'react';
import { withStyle } from '@core/container';
import { useLinkTo } from '@core/hooks';
import Logo from '@src/dist/shared/gear/logo';
import styles from './header.scss';

export default withStyle(styles)(({ toggleDrawer }: any) => {
  const linkTo = useLinkTo();
  return (
    <nav styleName="navbar">
      <button
        type="button"
        styleName="btn btn-icon"
        aria-label="Search"
        onClick={toggleDrawer('search', true)}
        onKeyDown={toggleDrawer('search', true)}>
        <span aria-hidden="true">
          <i class="fas fa-search"></i>
        </span>
      </button>

      <div styleName="flex-fill" onClick={linkTo('/')}>
        <Logo position="center" type={'white'} />
      </div>

      <button
        type="button"
        styleName="btn btn-icon"
        aria-label="Menu"
        onClick={toggleDrawer('menu', true)}
        onKeyDown={toggleDrawer('menu', true)}>
        <span aria-hidden="true">
          <i class="fas fa-bars"></i>
        </span>
      </button>
    </nav>
  );
});
