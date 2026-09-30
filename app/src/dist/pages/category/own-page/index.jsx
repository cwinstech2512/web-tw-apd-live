/* @flow */
import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathSelector, useBreakPoint } from '@core/hooks';
import { withStyle } from '@core/container';

import MainTitle from '@src/dist/shared/gear/main-title';
import { ErrorMsg, EmptyResult } from '@src/dist/shared/gear/error-block';
import { SectionA, SectionE } from '@src/dist/shared/gear/section';
import Pagination from '@src/dist/shared/gear/pagination';

import { getCategoryPosts } from '@src/libraries/axios-manager';
import { isEmpty } from 'ramda';

import styles from './category.scss';

type Props = {
  id: string,
  perPage: number
};
/**
 * OwnCategory
 * @desc 只有自己的主分類頁
 * @property {string} id 類別id from jsx
 * @property {number} perPage 一個分頁項目數 from jsx
 * @example
 *   <OwnCategory id="4" perPage={15}/>
 */
export default (React.memo: any)(
  withStyle(styles)(({ id, perPage }: Props) => {
    const dispatch = useDispatch();
    const deviceTheme = useBreakPoint();
    const category = usePathSelector('wp-category.data', {});
    const main = usePathSelector('wp-posts.main', {});
    const [page, setPage] = useState(1);

    useEffect(() => {
      if (page !== 1) setPage(1);
    }, [id]);

    if (!category[id]) return <ErrorMsg />;

    /* 處理換頁 */
    const handleChange = value => () => {
      setPage(value);
      dispatch(getCategoryPosts(id, perPage, value));
    };

    const {
      pagination: { total = 0, pages = 0, now = 0 },
      list
    } = main[id] || {
      pagination: { total: 0, pages: 0, now: 0 },
      list: []
    };

    return deviceTheme === 'mobile' ? (
      <Fragment>
        <MainTitle title={category[id].name} />
        {isEmpty(list) ? (
          <EmptyResult title="尚無文章" />
        ) : (
          <Fragment>
            <SectionA max={perPage} list={list} />
            <div styleName="pagination">
              <Pagination count={pages} page={page} pageChange={handleChange} />
            </div>
          </Fragment>
        )}
      </Fragment>
    ) : (
      <Fragment>
        <SectionE title={category[id].name} list={list} />
        <div styleName="pagination">
          <Pagination count={pages} page={page} pageChange={handleChange} />
        </div>
      </Fragment>
    );
  })
);
