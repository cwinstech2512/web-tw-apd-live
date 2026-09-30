/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import { Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Logo from '@src/dist/shared/gear/logo';
import LoginBlock from './login-block';
import Nav from './nav';
import styles from './header.scss';
import home_styles from './header-home.scss';

export default withStyle(styles)(() => {
  const linkTo = useLinkTo();
  return (
    <div styleName="header">
      <div styleName="header-logo" onClick={linkTo('/')}>
        <Logo type={'white'} />
      </div>
      <div styleName="header-nav">
        <Nav />
      </div>
      {/* <div styleName="header-login">
        <LoginBlock />
      </div> */}
    </div>
  );
});

export const HomeHeader = withStyle(home_styles)(({ show = false }) => {
  const linkTo = useLinkTo();
  return (
    <div styleName={`header ${show ? '' : 'top'}`}>
      <div styleName="header-logo" onClick={linkTo('/')}>
        <Logo type={'white'} />
      </div>
      <div styleName="header-nav">
        <Nav />
      </div>
      {/* <div styleName="header-login">
        <LoginBlock />
      </div> */}
    </div>
  );
});

export const WhiteHeader = withStyle(home_styles)(() => {
  const linkTo = useLinkTo();
  return (
    <div styleName={`white-header header`}>
      <div styleName="header-logo" onClick={linkTo('/')}>
        <Logo type={'white'} />
      </div>
      <div styleName="header-nav"></div>
      {/* <div styleName="header-login">
        <LoginBlock white={true} />
      </div> */}
    </div>
  );
});
