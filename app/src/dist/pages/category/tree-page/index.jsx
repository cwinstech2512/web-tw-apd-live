/* @flow */
import React, { Fragment } from 'react';
import { useBreakPoint } from '@core/hooks';
import { usePathSelector } from '@core/hooks';
import MainTitle from '@src/dist/shared/gear/main-title';
import { EmptyResult } from '@src/dist/shared/gear/error-block';
import { SectionB, SectionE } from '@src/dist/shared/gear/section';
import BtnMore from '@src/dist/shared/gear/btn-more';

import { map, isEmpty } from 'ramda';

type Props = {
  idList: Array<string>
};
/**
 * TreeCategory
 * @desc 含子分類的主分類頁
 * @example
 *   <TreeCategory />
 */
export default (React.memo: any)(({ idList }: Props) => {
  const deviceTheme = useBreakPoint();
  const category = usePathSelector('wp-category.data', {});
  const main = usePathSelector('wp-posts.main', {});

  return deviceTheme === 'mobile' ? (
    <Fragment>
      {map(id => {
        const { list = [] } = main[id] || {};
        return (
          <div key={`cat-${id}`}>
            <MainTitle title={category[id].name} />
            {isEmpty(list) ? (
              <EmptyResult title="尚無文章" />
            ) : (
              <Fragment>
                <SectionB list={list} />
                <BtnMore categoryId={id} />
              </Fragment>
            )}
          </div>
        );
      }, idList)}
    </Fragment>
  ) : (
    <Fragment>
      {map(id => {
        const { list = [] } = main[id] || {};
        return (
          <SectionE
            key={`section-${id}`}
            title={category[id].name}
            list={list}
            btnShowId={id}
            max={20}
          />
        );
      }, idList)}
    </Fragment>
  );
});
