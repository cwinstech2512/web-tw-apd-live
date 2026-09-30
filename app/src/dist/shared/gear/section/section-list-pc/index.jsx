/* @flow */
import React from 'react';
import { useWindowSize } from '@core/hooks';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import Image from '@src/dist/shared/gear/img-ele';
import Highlighter from 'react-highlight-words';
import styles from './section-list.scss';

/**
 * SectionListItemPc
 * @desc 文章列(電腦版)
 * @requires
 * @property {string} id 文章id from jsx
 * @property {string} title 文章標題 from jsx
 * @property {string} date 文章日期 from jsx
 * @property {string} previewImg 預覽圖片src from jsx
 * @property {string} highlight 關鍵字 from jsx
 * @example
 *   <SectionListItem date="2020-03-19T17:23:36" title="去海邊旅遊必備物品" previewImg="url link"/>
 */
export default (React.memo: any)(
  withStyle(styles)(({ id, date, title, previewImg, highlight = '' }) => {
    const linkTo = useLinkTo();
    const [width, height] = useWindowSize();

    let MAX_LENGTH = 16;
    if (width >= 1000) MAX_LENGTH = 24;

    return (
      <div styleName="section" onClick={linkTo(`/article/${id}`)}>
        <div styleName="section-box-left">
          <div styleName="section-image-box">
            <Image
              styleName="section-image"
              alt={title}
              src={previewImg || ''}
            />
          </div>
        </div>
        <div styleName="section-box-right">
          <div styleName="section-title">
            <Highlighter
              searchWords={[highlight]}
              textToHighlight={
                title.length >= MAX_LENGTH
                  ? `${title.substr(0, MAX_LENGTH)}..`
                  : title
              }
            />
          </div>
          <div styleName="section-date">{date.replace(/T/, ' ')}</div>
        </div>
      </div>
    );
  })
);
