/* @flow */
import React from 'react';
import { withStyle } from '@core/container';
import CategoryItem from '@src/dist/shared/gear/block/swiper/category';
import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import { min, times, isEmpty } from 'ramda';

/**
 * Category
 * @desc [電腦版]子類別排列區塊
 * @property {Array<string>} [list=[]] 子類別id列表
 * @example
 *    <Category list={[105,106,107]} />
 */
export default withStyle()(({ list = [] }) => {
  if (isEmpty(list)) return <ErrorMsgSm msg="category list error" />;

  return (
    <div styleName="row">
      {times(
        idx => (
          <div key={`cat-${idx}`} styleName="col pb-2">
            <CategoryItem idx={idx} id={list[idx]} />
          </div>
        ),
        min(4, list.length)
      )}
    </div>
  );
});
