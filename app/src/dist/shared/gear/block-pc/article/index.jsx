/* @flow */
import React from 'react';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import CircleItem from '@src/dist/shared/gear/block/swiper/circle';
import CardItem from '@src/dist/shared/gear/block/swiper/card';
import NormalItem from '@src/dist/shared/gear/block/swiper/normal';
import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import { min, times, isNil, isEmpty } from 'ramda';

/* 項目 */
const eleItem = {
  normal: NormalItem,
  circle: CircleItem,
  card: CardItem
};

/**
 * Article
 * @desc [電腦版]文章排列區塊
 * @property {'circle'|'card'|'normal'} [type='normal'] 文章區塊類型/樣式
 * @property {string} categoryId 類別id
 * @example
 *    <Article type='circle' categoryId={107} />
 */
export default withStyle()(({ type = 'normal', categoryId = -1 }) => {
  const articleList = usePathSelector(`wp-posts.main.${categoryId}.list`, []);
  if (isNil(categoryId) || categoryId === -1)
    return <ErrorMsgSm msg="category id error" />;

  const Item = eleItem[type];

  if (isEmpty(articleList)) return <ErrorMsgSm msg="尚無文章" />;

  return (
    <div styleName="row">
      {times(
        idx => (
          <div key={`article-${idx}`} styleName="col-3 pb-5">
            <Item articleId={articleList[idx]} />
          </div>
        ),
        min(8, articleList.length)
      )}
    </div>
  );
});
