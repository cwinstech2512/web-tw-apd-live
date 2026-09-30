/* @flow */
import React from 'react';
import { useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import styles from './category.scss';

import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import picBuilding from './pic_building.jpg';
import picFood from './pic_food.jpg';
import picSea from './pic_sea.jpg';

import { isEmpty } from 'ramda';

const picList = [picSea, picBuilding, picFood, picSea];

/**
 * Category
 * @desc 子類別區塊
 * @property {number} idx 索引
 * @property {string} id 類別id
 * @example
 *   <CategoryItem idx={0} id={107} />
 */
export default (React.memo: any)(
  withStyle(styles)(({ idx, id = 0 }) => {
    const linkTo = useLinkTo();
    const category = usePathSelector(`wp-category.data.${id}`, {});

    if (id === 0 || isEmpty(category))
      return <ErrorMsgSm msg="category id error" />;

    return (
      <div
        onClick={linkTo(`/main/${id}`)}
        styleName="solid-img solid-pointer"
        style={{ backgroundImage: `url(${(picList[idx]: any)})` }}>
        <div styleName="solid-filter"></div>
        <div styleName="solid-title">{category.name}</div>
      </div>
    );
  })
);
