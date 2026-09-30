/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import ArticleSwiper, { CategorySwiper } from './swiper';
import { isNil, F, isEmpty } from 'ramda';
import styles from './block.scss';

/**
 * Block
 * @desc [手機版]一個文章大類別區塊
 * @property {'light'|'dark'} [bg='light'] 區塊背景樣式
 * @property {'circle'|'card'|'normal'} [type='normal'] 文章區塊類型/樣式
 * @property {boolean} [more=true] 是否顯示更多按鈕
 * @property {boolean} [branch=false] 是否顯示子類別
 * @property {string} categoryId 類別id
 * @property {string} title 類別名稱
 * @property {Array<string>} [childList=[]]
 *           子類別id列表，只在branch為true，顯示子類別時使用
 * @example
 *   <Block type="circle" bg="dark" categoryId={107} more
 *      title="花火節優惠專區" />
 */
export default withStyle(styles)(
  ({
    type = 'normal',
    bg = 'light',
    categoryId = null,
    more = true,
    branch = false,
    title = '',
    childList = []
  }) => {
    const linkTo = useLinkTo();
    return (
      <div styleName={`block-${bg} pt-5 pb-4`}>
        <div
          styleName="h5 block-title text-center mb-0 py-3"
          onClick={isNil(categoryId) ? F : linkTo(`/main/${categoryId}`)}
          style={{background: `rgb(13, 133, 73)`, color: `#ffffff`}}>
          {title}
        </div>
        <div styleName="text-center mb-4" aria-hidden="true">
          <span>
            <i class="fas fa-angle-down"></i>
          </span>
        </div>

        {branch && !isEmpty(childList) ? (
          <CategorySwiper list={childList} />
        ) : (
          <ArticleSwiper type={type} categoryId={categoryId} />
        )}

        {more && (
          <div styleName="text-center mt-3 mb-2">
            <div
              styleName="btn-more btn-sm text-center"
              onClick={isNil(categoryId) ? F : linkTo(`/main/${categoryId}`)}>
              更多{title}
              <span styleName="btn-more-arrow" aria-hidden="true">
                <i class="fas fa-chevron-right"></i>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
