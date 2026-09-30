/* @flow */
import React from 'react';
import { useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import ErrImg from '@src/dist/shared/gear/img-ele/preview.png';
import { isEmpty, times, min } from 'ramda';
import styles from './solid-category.scss';

import picBuilding from './pic_building.jpg';
import picFood from './pic_food.jpg';
import picSea from './pic_sea.jpg';

const picList = [picSea, picBuilding, picFood, picSea];

/**
 * SolidCategory
 * @desc 固定子類別區塊
 * @property {Array<string>} [list=[]]
 *           子類別id列表，只在branch為true，顯示子類別時使用
 * @example
 *   <SolidCategory list={107} />
 */
export default (React.memo: any)(
  withStyle(styles)(({ list = [] }) => {
    const linkTo = useLinkTo();
    const categoryData = usePathSelector('wp-category.data', {});

    if (isEmpty(list))
      return <div styleName="text-center">category list error</div>;

    return (
      <div styleName="solid">
        {times(
          idx => (
            <div key={`category-${idx}`}>
              <div
                styleName="solid-img solid-pointer"
                onClick={linkTo(`/main/${list[idx]}`)}
                style={{
                  backgroundImage: `url(${(picList[idx]: any)})`
                }}>
                <div styleName="solid-filter"></div>
                <div styleName="solid-title">
                  {categoryData[list[idx]].name}
                </div>
              </div>
            </div>
          ),
          min(4, list.length)
        )}
      </div>
    );
  })
);
