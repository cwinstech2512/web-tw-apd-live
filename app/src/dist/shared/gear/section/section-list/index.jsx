/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import Image from '@src/dist/shared/gear/img-ele';
import Highlighter from 'react-highlight-words';
import styles from './section-list.scss';

const MAX_LENGTH = 25;

/**
 * SectionListItem
 * @desc 文章列
 * @requires
 * @property {string} id 文章id from jsx
 * @property {string} title 文章標題 from jsx
 * @property {string} date 文章日期 from jsx
 * @property {string} previewImg 預覽圖片src from jsx
 * @property {string} highlight 關鍵字 from jsx
 * @example
 *   <SectionListItem date="2020-03-19T17:23:36" title="去海邊旅遊必備物品"
 *      previewImg="url link" highlight="keyword"/>
 */
export default (React.memo: any)(
  withStyle(styles)(({ id, date, title, previewImg, highlight = '' }) => {
    const linkTo = useLinkTo();

    return (
      <div styleName="section" onClick={linkTo(`/article/${id}`)}>
        <Image styleName="section-image" alt={title} src={previewImg || ''} />
        <div styleName="section-box">
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
