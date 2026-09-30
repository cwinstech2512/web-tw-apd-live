/* @flow */
import React from 'react';
import { useBreakPoint, useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';

import ErrImg from '@src/dist/shared/gear/img-ele/preview.png';
import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import { isEmpty } from 'ramda';

import styles from '../slider.scss';

const MAX_LENGTH = {
  mobile: 42,
  pc: 28
};

/**
 * SliderItem - Card
 * @desc 滑動的文章項目，樣式為卡片
 * @property {string} articleId 類別id
 * @example
 *   <SliderCardItem articleId={107} />
 */
export default (React.memo: any)(
  withStyle(styles)(({ articleId = 0 }) => {
    const deviceTheme = useBreakPoint();
    const linkTo = useLinkTo();
    const article = usePathSelector(`wp-posts.posts.${articleId}`, {});

    if (articleId === 0 || isEmpty(article))
      return <ErrorMsgSm msg="article id error" />;

    return (
      <div styleName="card slider-card">
        <div
          styleName="card-img-top img-card-box slider-pointer"
          onClick={linkTo(`/article/${articleId}`)}>
          <div
            styleName="img-card"
            style={{
              backgroundImage: `url(${article.previewImg || ErrImg})`
            }}></div>
        </div>
        <div styleName="card-body" onClick={linkTo(`/article/${articleId}`)}>
          <div styleName="card-title slider-card-title slider-title">
            {article.title.length >= MAX_LENGTH[deviceTheme]
              ? `${article.title.substr(0, MAX_LENGTH[deviceTheme])}..`
              : article.title}
          </div>
          <p styleName="card-text text-right">
            <span styleName="slider-card-more">閱讀全文</span>
          </p>
        </div>
      </div>
    );
  })
);
