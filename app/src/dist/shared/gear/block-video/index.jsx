/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import VedioSwiper from './swiper';
import styles from './block.scss';

/**
 * VideoBlock
 * @desc [手機版]影音專區區塊
 * @property {'light'|'dark'} [bg='light'] 區塊背景樣式
 * @property {boolean} [more=true] 是否顯示更多按鈕
 * @property {string} title 類別名稱
 * @example
 *   <VideoBlock bg="dark" more title="影音專區"/>
 */
export default withStyle(styles)(
  ({ bg = 'light', more = true, title = '影音專區' }) => {
    const linkTo = useLinkTo();

    return (
      <div styleName={`block-${bg} pt-5 pb-4`}>
        <div styleName="wrapper">
          <div
            styleName="h5 block-title text-center mb-0 py-3"
            onClick={linkTo(`/video`)}
            style={{background: `rgb(13, 133, 73)`, color: `#ffffff`, borderRadius: `1em`}}>
            {title}
          </div>
          <div styleName="text-center mb-4" aria-hidden="true">
            <span>
              <i class="fas fa-angle-down"></i>
            </span>
          </div>

          <VedioSwiper />

          {more && (
            <div styleName="text-center mt-3 mb-2">
              <div
                styleName="btn-more btn-sm text-center"
                onClick={linkTo(`/video`)}>
                更多{title}
                <span styleName="btn-more-arrow" aria-hidden="true">
                  <i class="fas fa-chevron-right"></i>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
