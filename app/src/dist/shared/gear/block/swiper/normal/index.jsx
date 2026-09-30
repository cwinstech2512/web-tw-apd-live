/* @flow */
import React from 'react';
import { useBreakPoint, useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';

import ErrImg from '@src/dist/shared/gear/img-ele/preview.png';
import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import { isEmpty } from 'ramda';

import styles from '../slider.scss';

const MAX_LENGTH = {
  mobile: 30,
  pc: 20
};

/**
 * SliderItem - Normal
 * @desc 滑動的文章項目，普通樣式
 * @property {string} articleId 類別id
 * @example
 *   <SliderNormalItem articleId={107} />
 */
export default (React.memo: any)(
  withStyle(styles)(({ articleId = 0 }) => {
    const deviceTheme = useBreakPoint();
    const linkTo = useLinkTo();
    const article = usePathSelector(`wp-posts.posts.${articleId}`, {});

    if (articleId === 0 || isEmpty(article))
      return <ErrorMsgSm msg="article id error" />;

    return (
      <div styleName="slider-normal">
        <div
          styleName="img-normal-box slider-pointer flip-card"
          onClick={linkTo(`/article/${articleId}`)}>
          <div styleName="flip-card-inner">
            <div
              styleName="flip-card-front"
            >
              <div
                styleName="img-normal"
                style={{
                  backgroundImage: `url(${article.previewImg || ErrImg})`
                }}
                alt={article.title}></div>
            </div>
            <div styleName="flip-card-back">
              <h1><i class="fab fa-sistrix"></i></h1>
            </div>
          </div>
        </div>
        <div
          styleName="mb-4 slider-normal-title slider-title"
          onClick={linkTo(`/article/${articleId}`)}>
          {article.title.length >= MAX_LENGTH[deviceTheme]
            ? `${article.title.substr(0, MAX_LENGTH[deviceTheme])}..`
            : article.title}
        </div>
      </div>
    );
  })
);
