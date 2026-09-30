/* @flow */
import React, { Fragment, useEffect, useState } from 'react';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import { IconButton } from '@material-ui/core';
import { map, isEmpty, isNil, reduce, assoc } from 'ramda';

import styles from '../menu-drawer.scss';

export default withStyle(styles)(({ onClose, linkTo }) => {
  const { treeData = {}, data } = usePathSelector('wp-category', {});
  const [menu, setMenu] = useState({});

  /* 初始化 Menu State */
  useEffect(() => {
    if (!isEmpty(treeData['0'])) {
      setMenu(
        reduce(
          (orign, id) => (assoc: any)(id, false, orign),
          {}
        )(treeData['0'] || [])
      );
    }
  }, [treeData['0']]);

  const openMenu = categoryId => event => {
    setMenu({ ...menu, [categoryId]: !menu[categoryId] });
  };

  const goMenu = id => event => {
    linkTo(`/main/${id}`)();
    onClose({});
  };

  return map(id => {
    return (
      <Fragment key={`menu-frag-main-${id}`}>
        <div
          key={`menu-main-${id}`}
          styleName={`menu-main ${menu[id] ? 'open' : ''}`}
          onClick={isNil(treeData[id]) ? goMenu(id) : openMenu(id)}>
          <div styleName={'menu-main-title'}>{data[id].name}</div>
          {!isNil(treeData[id]) ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label={`open ${data[id].name} menu`}>
              <span aria-hidden="true">
                <i class="fas fa-angle-down"></i>
              </span>
            </IconButton>
          ) : null}
        </div>
        {!isNil(treeData[id]) ? (
          <div
            key={`menu-${id}-sub`}
            styleName={`menu-sub ${menu[id] ? '' : 'close'}`}>
            {map(
              cid => (
                <div
                  styleName="menu-sub-title"
                  key={`sub-${cid}`}
                  onClick={goMenu(cid)}>
                  {data[cid].name}
                </div>
              ),
              treeData[id] || []
            )}
          </div>
        ) : null}
      </Fragment>
    );
  }, treeData['0'] || []);
});
