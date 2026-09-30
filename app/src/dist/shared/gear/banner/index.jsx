/* @flow */
import React from 'react';
import { withBannerHandler } from './handler';
import { BannerItem, AnchorItem, BannerLink } from './banner-item';

/* helper */
import { map } from 'ramda';

const View = ({
  size = 'normal',
  prev,
  active,
  list,
  anchor = true,
  showTitle = false,
  changeActive,
  changeToPrev,
  changeToNext,
  handleStart,
  handleStop
}) => (
  <div styleName="banner" onMouseOver={handleStop} onMouseLeave={handleStart}>
    <div
      styleName="images"
      style={size === 'slim' ? { paddingBottom: '596px' } : {}}>
      {map(
        ({ url, index, ...other }) => (
          <BannerItem
            key={`banner-${index}`}
            src={url}
            {...other}
            prev={prev === index}
            active={active === index}
            showTitle={showTitle}
          />
        ),
        list
      )}
    </div>
    {list.length > 1 ? (
      <div styleName="arrow">
        <div styleName="arrow__btn" onClick={changeToPrev}>
          <span aria-hidden="true">
            <i class="fas fa-chevron-left"></i>
          </span>
        </div>
        <div styleName="arrow__center">
          <BannerLink data={list[active]} />
        </div>
        <div styleName="arrow__btn" onClick={changeToNext}>
          <span aria-hidden="true">
            <i class="fas fa-chevron-right"></i>
          </span>
        </div>
      </div>
    ) : null}
    {anchor ? (
      <div styleName="anchor">
        <ul>
          {map(
            ({ index }) => (
              <AnchorItem
                key={`anchor-${index}`}
                changeActive={changeActive}
                index={index}
                active={active === index}
              />
            ),
            list
          )}
        </ul>
      </div>
    ) : null}
  </div>
);

/**
 * Banner
 * @desc Banner元件
 * @requires withComposeHandler
 * @property {Array<any>} list 圖片陣列 from jsx
 * @property {boolean} [anchor=true] 有沒有anchor(預設有) from jsx
 * @property {number} prev from withComposeHandler
 * @property {number} active from withComposeHandler
 * @property {Array<Object>} list 輪播清單 from withComposeHandler
 * @property {function} changeActive 輪播切換 from withComposeHandler
 * @property {function} changeToPrev 切換到前一張 from withComposeHandler
 * @property {function} changeToNext 切換到下一張 from withComposeHandler
 * @property {function} handleStart 開始輪播 from withComposeHandler
 * @property {function} handleStop 終止輪播 from withComposeHandler
 * @example
 *   <Banner list={['url.jpg','url.jpg','url.jpg']} anchor={false}/>
 */
export const Banner = withBannerHandler(View);
