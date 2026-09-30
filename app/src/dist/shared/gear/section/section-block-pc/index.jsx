/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import Image from '@src/dist/shared/gear/img-ele';
import styles from './section-block.scss';

/**
 * SectionBlockPc
 * @desc 文章區塊（更多文章的小區塊）(電腦版)
 * @requires
 * @property {string} id 文章id from jsx
 * @property {string} title 文章標題 from jsx
 * @property {string} previewImg 預覽圖片src from jsx
 * @example
 *   <SectionBlockPc id="250" title="去海邊旅遊必備物品" previewImg="url link"/>
 */
export default (React.memo: any)(
  withStyle(styles)(({ id = '', title = '', previewImg = '' }) => {
    const linkTo = useLinkTo();

    return (
      <div styleName="section" onClick={linkTo(`/article/${id}`)}>
        <div styleName="section-image-box">
          <Image styleName="section-image" alt={title} src={previewImg || ''} />
        </div>
        <div styleName="section-title">{title}</div>
      </div>
    );
  })
);
