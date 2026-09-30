/* @flow */
import React from 'react';
import withBannerStyle from './handler';
import { useLinkTo } from '@core/hooks';
import { isEmpty } from 'ramda';

/**
 * BannerLink
 * @desc Banner 連結
 * @requires withBannerStyle
 * @example
 *   <BannerLink />
 */
export const BannerLink = withBannerStyle(({ data = {} }) => {
  const linkTo = useLinkTo();
  if (isEmpty(data)) return null;
  const { id } = data;
  return <div styleName="link" onClick={linkTo(`/article/${id}`)} />;
});

/**
 * BannerItem
 * @desc 圖片元件
 * @requires withBannerStyle
 * @property {string} src 圖片路徑 from jsx
 * @property {boolean} prev 是否為前一個 from jsx
 * @property {boolean} active 是否為active from jsx
 * @example
 *   <BannerItem src={'images/d5ef2e4424b043dc7bd55ba27ccfb947.jpg'}
 *      prev={true} active={false}/>
 */
export const BannerItem = withBannerStyle(
  ({ src, prev, active, id = '', title = '', showTitle = false }) => {
    const linkTo = useLinkTo();
    return (
      <div
        styleName={`banner-item ${prev ? 'prev' : ''} ${
          active ? 'active' : ''
        }`}>
        <div
          styleName="img"
          style={{
            backgroundImage: `url(${src})`
          }}
        />
        {showTitle && (
          <div styleName="title" onClick={linkTo(`/article/${id}`)}>
            {title}
          </div>
        )}
      </div>
    );
  }
);

/**
 * AnchorItem
 * @desc 錨點元件
 * @requires withBannerStyle
 * @property {function} changeActive 切換圖片 from jsx
 * @property {number} index 圖片索引 from jsx
 * @property {boolean} active 是否為active from jsx
 * @example
 *    <AnchorItem changeActive={changeActive} index={0} active={true} />
 */
export const AnchorItem = withBannerStyle(({ index, changeActive, active }) => (
  <li
    onClick={_ => changeActive(index)}
    styleName={`anchor-item ${active ? 'active' : ''}`}
  />
));
