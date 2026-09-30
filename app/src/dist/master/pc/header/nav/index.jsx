import React, { useRef, useState } from 'react';
import { useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import Menu from './menu';
import styles from './nav.scss';

const scrollGap = 150;
export default withStyle(styles)(() => {
  const [translateDistance, setTranslate] = useState(0);
  const [leftDisable, setLeftDisable] = useState(false);
  const [rightDisable, setRightDisable] = useState(false);
  const menuEl = useRef(null); // 顯示

  /* 處理滑動 */
  const slider = (position: string) => () => {
    const totalWidth = menuEl.current.scrollWidth; // 全部寬度
    const menuWidth = menuEl.current.offsetWidth; // 顯示寬度
    const scrollWidth = menuEl.current.scrollWidth - menuEl.current.offsetWidth; // 全部寬度 - 顯示寬度

    switch (position) {
      case 'right':
        if (rightDisable) return false;
        if (translateDistance + scrollGap >= scrollWidth) {
          setTranslate(scrollWidth);
          !rightDisable && setRightDisable(true);
          scrollWidth > 0 && leftDisable && setLeftDisable(false);
        } else {
          setTranslate(translateDistance + scrollGap);
          leftDisable && setLeftDisable(false);
        }
        break;
      case 'left':
        if (leftDisable) return false;
        if (translateDistance - scrollGap <= 0) {
          setTranslate(0);
          !leftDisable && setLeftDisable(true);
          scrollWidth > 0 && rightDisable && setRightDisable(false);
        } else {
          setTranslate(translateDistance - scrollGap);
          rightDisable && setRightDisable(false);
        }
        break;
    }
  };

  return (
    <div styleName="nav">
      <div
        styleName={`nav-arrow ${leftDisable ? 'nav-arrow--disable' : ''}`}
        onClick={slider('left')}>
        <span aria-hidden="true">
          <i class="fas fa-angle-left"></i>
        </span>
      </div>
      <Menu el={menuEl} distance={translateDistance} />
      <div
        styleName={`nav-arrow ${rightDisable ? 'nav-arrow--disable' : ''}`}
        onClick={slider('right')}>
        <span aria-hidden="true">
          <i class="fas fa-angle-right"></i>
        </span>
      </div>
    </div>
  );
});
