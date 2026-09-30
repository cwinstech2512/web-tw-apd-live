/* @flow */
import React, { useState } from 'react';
import { useScrollPosition } from '@core/hooks';
import { withStyle } from '@core/container';

import BootstraspCarousel from '@src/dist/shared/gear/carousel-bootstrap';
import Footer from '../footer';
import Header, { HomeHeader, WhiteHeader } from './header';
import Fast from './fast';
import LoginBlock from './header/login-block';

import styles from './pc.scss';
import home_styles from './pc-home.scss';

const PcHomeMaster = withStyle(home_styles)(({ children }) => {
  const [show, setShow] = useState(true);
  useScrollPosition(({ currPos }) => {
    if (currPos.y <= -600) show && setShow(false);

    if (currPos.y > -595) setShow(true);
  });

  return (
    <div styleName="master">
      <div styleName="white-header">
        <div styleName="wrapper">
          <WhiteHeader />
        </div>
      </div>
      <BootstraspCarousel type="focus" showTitle={true} />
      <div styleName={`header ${show ? 'header-relative' : ''}`}>
        <div styleName="wrapper header-wrapper">
          <HomeHeader show={show} />
        </div>
      </div>
      <div styleName={`${show ? '' : 'header-bottom'} master-content`}>
        <Fast />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
});

const PcMaster = withStyle(styles)(({ children }) => {
  return (
    <div styleName="master">
      <div styleName="header">
        <div styleName="wrapper header-wrapper">
          <Header />
        </div>
      </div>
      <div styleName="header-bottom master-content">
        <Fast />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
});

export default ({ children, isHome }: any) => {
  return isHome ? (
    <PcHomeMaster>{children}</PcHomeMaster>
  ) : (
    <PcMaster>{children}</PcMaster>
  );
};
