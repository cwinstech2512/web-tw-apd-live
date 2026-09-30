/* @flow */
import React, { Fragment, useState } from 'react';
import { useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import { Button, List } from '@material-ui/core';
import { map, isNil, F } from 'ramda';
import styles from '../nav.scss';

export default withStyle(styles)(({ el, distance }) => {
  const linkTo = useLinkTo();
  const {
    data,
    treeData = {},
    treeData: { '0': mainList = [] }
  } = usePathSelector('wp-category', {});
  const activeId = usePathSelector('setting.activeId', -1);
  const [menu, setMenu] = useState({});

  /* 子選單開關 */
  const hoverMenu = (categoryId, open) => event => {
    setMenu({ ...menu, [categoryId]: open });
  };

  return (
    <div styleName="nav-menu">
      <div styleName="nav-menu-bar">
        <div
          styleName="nav-menu-scroll"
          ref={el}
          style={{
            transform: `translateX(-${distance}px)`
          }}>
          {map(
            id => (
              <div
                key={`main-${id}`}
                styleName={`nav-menu-item-box 
                ${menu[id] ? 'nav-menu-item-box--hover' : ''}`}
                onMouseOver={!isNil(treeData[id]) ? hoverMenu(id, true) : F}
                onMouseOut={!isNil(treeData[id]) ? hoverMenu(id, false) : F}>
                <div
                  styleName={`nav-menu-item 
                    ${id === activeId ? 'nav-menu-item--active' : ''}
                  `}
                  onClick={linkTo(`/main/${id}`)}>
                  {data[id].name}
                </div>
              </div>
            ),
            mainList
          )}
        </div>
      </div>
      {/* 放導覽列的影分身 */}
      <div
        styleName="nav-menu-shadow"
        style={{
          transform: `translateX(-${distance}px)`
        }}>
        {map(
          id => (
            <div key={`shadow-${id}`} styleName={`nav-menu-item-box`}>
              <div
                styleName={`nav-menu-item ${
                  id === activeId ? 'nav-menu-item--active' : ''
                }`}>
                {data[id].name}
              </div>
              {!isNil(treeData[id]) ? (
                <div styleName="nav-child">
                  <div
                    styleName={`nav-child-poper ${menu[id] ? 'open' : ''}`}
                    onMouseOver={hoverMenu(id, true)}
                    onMouseOut={hoverMenu(id, false)}>
                    <div>
                      {map(
                        cid => (
                          <div
                            key={`sub-${cid}`}
                            onClick={linkTo(`/main/${cid}`)}
                            styleName="nav-child-item">
                            {data[cid].name}
                          </div>
                        ),
                        treeData[id] || []
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ),
          mainList
        )}
      </div>
    </div>
  );
});
