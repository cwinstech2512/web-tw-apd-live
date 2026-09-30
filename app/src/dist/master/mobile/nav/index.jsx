/* @flow */
import React, { useRef, useState, Fragment } from 'react';
import { useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import { map } from 'ramda';
import styles from './nav.scss';

const scrollGap = 100;
export default withStyle(styles)(() => {
  const linkTo = useLinkTo();
  const {
    data,
    treeData: { '0': mainList = [] }
  } = usePathSelector('wp-category', {});

  const activeId = usePathSelector('setting.activeId', -1);

  return (
    <nav styleName="nav">
      <div styleName="nav-arrow">
        <span aria-hidden="true">
          <i class="fas fa-angle-left"></i>
        </span>
      </div>
      <div styleName="nav-menu">
        <div styleName="nav-scroll">
          {map(
            id => (
              <div
                key={`main-${id}`}
                onClick={linkTo(`/main/${id}`)}
                styleName={`nav-link nav-item ${
                  id === activeId ? 'active' : ''
                }`}>
                {data[id].name}
              </div>
            ),
            mainList
          )}
        </div>
      </div>
      <div styleName="nav-arrow">
        <span aria-hidden="true">
          <i class="fas fa-angle-right"></i>
        </span>
      </div>
    </nav>
  );
});
