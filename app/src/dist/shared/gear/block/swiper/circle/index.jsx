/* @flow */
import React from 'react';
import { useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';

import ErrImg from '@src/dist/shared/gear/img-ele/preview.png';
import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import { isEmpty } from 'ramda';

import styles from '../slider.scss';

const MAX_LENGTH = 27;

/**
 * SliderItem - Circle
 * @desc 滑動的文章項目，圖片為圓形
 * @property {string} articleId 類別id
 * @example
 *   <SliderCircleItem articleId={107} />
 */
export default (React.memo: any)(
  withStyle(styles)(({ articleId = 0, clickable }) => {
    const linkTo = useLinkTo();
    const article = usePathSelector(`wp-posts.posts.${articleId}`, {});

    if (articleId === 0 || isEmpty(article))
      return <ErrorMsgSm msg="article id error" />;

    return (
      <div styleName="slider-circle">
        <div styleName="mb-3">
          <div
            styleName="img-circle-box slider-pointer"
            alt={article.title}
            onClick={linkTo(`/article/${articleId}`)}>
            <div
              styleName="img-circle"
              style={{
                backgroundImage: `url(${article.previewImg || ErrImg})`
              }}></div>
          </div>
        </div>
        <div
          styleName="text-center slider-title"
          onClick={linkTo(`/article/${articleId}`)}>
          {article.title.length >= MAX_LENGTH
            ? `${article.title.substr(0, MAX_LENGTH)}..`
            : article.title}
        </div>
      </div>
    );
  })
);
