/* @flow */
import React, { Fragment, useState } from 'react';
import Header from './header';
import Nav from './nav';
import Fast from './fast';
import SearchDrawer from './search-drawer';
import MenuDrawer from './menu-drawer';
import Footer from '../footer';

export default ({ children }: any) => {
  const [drawer, setDrawerState] = useState({
    search: false,
    menu: false
  });

  const toggleDrawer = (name, open) => event => {
    if (event.key === 'Tab' || event.key === 'Shift') {
      return;
    }
    setDrawerState(state => ({ ...state, [name]: open }));
  };

  return (
    <Fragment>
      <header>
        {/* header */}
        <Header toggleDrawer={toggleDrawer} />
        {/* 分類導覽 */}
        <Nav />

        {/* 快訊 */}
        <Fast />
      </header>

      {/* content */}
      <main style={{ minHeight: '400px' }}>{children}</main>

      {/* drawer */}
      <SearchDrawer
        open={drawer.search}
        onClose={toggleDrawer('search', false)}
      />
      <MenuDrawer open={drawer.menu} onClose={toggleDrawer('menu', false)} />

      {/* Footer */}
      <Footer />
    </Fragment>
  );
};
