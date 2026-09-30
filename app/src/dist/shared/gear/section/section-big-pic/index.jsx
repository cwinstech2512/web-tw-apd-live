/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import Image from '@src/dist/shared/gear/img-ele';
import styles from './section-pic.scss';

/**
 * SectionPic
 * @desc 大圖文章列
 * @requires
 * @property {string} id 文章id from jsx
 * @property {string} title 文章標題 from jsx
 * @property {string} date 文章日期 from jsx
 * @property {string} previewImg 預覽圖片src from jsx
 * @example
 *   <SectionPic date="2020-03-19T17:23:36" title="去海邊旅遊必備物品" previewImg="url link"/>
 */
export default (React.memo: any)(
  withStyle(styles)(({ id = '', date = '', title = '', previewImg = '' }) => {
    const linkTo = useLinkTo();

    return (
      <div styleName="section" onClick={linkTo(`/article/${id}`)}>
        <Image styleName="section-image" alt={title} src={previewImg || ''} />
        <div styleName="section-title">{title}</div>
        <div styleName="section-date">{date.replace(/T/, ' ')}</div>
      </div>
    );
  })
);
