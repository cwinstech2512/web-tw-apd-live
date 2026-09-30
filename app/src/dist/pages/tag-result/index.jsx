/* @flow */
import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usePathSelector, useBreakPoint } from '@core/hooks';
import { withStyle } from '@core/container';

import { getTagById, getPostByTag } from '@src/libraries/axios-manager';

import { ErrorMsg, EmptyResult } from '@src/dist/shared/gear/error-block';
import { SectionA, SectionE } from '@src/dist/shared/gear/section';
import Pagination from '@src/dist/shared/gear/pagination';

import { validId } from '@src/helper/transformData.js';
import { isEmpty, contains } from 'ramda';

import styles from './search.scss';

const perPage = 15;
/**
 * SearchTag
 * @desc 搜尋hashtag結果列表
 * @example
 *   <SearchTag />
 */
export default withStyle(styles)(() => {
  let { tagId = '' } = useParams();
  const deviceTheme = useBreakPoint();
  if (!validId(tagId) && tagId === '') return <ErrorMsg />;

  const dispatch = useDispatch();
  const { data, tagList } = usePathSelector('wp-tags', {});
  const {
    posts,
    search: {
      list,
      pagination: { total, pages, now }
    }
  } = usePathSelector('wp-posts', {});
  const tag = !isEmpty(tagId) && data[tagId] ? data[tagId].name : '';

  useEffect(() => {
    /* 檢查是否有該Tag的資料，若無則發送查詢 */
    if (!isEmpty(tagList) && !contains(parseInt(tagId), tagList)) {
      dispatch(getTagById(tagId));
    }

    /* 搜尋相關文章 */
    if (validId(tagId)) {
      dispatch(getPostByTag(tagId), perPage, 1);
    }
  }, [tagId]);

  const [page, setPage] = useState(1);

  /* 處理換頁 */
  const handleChange = value => () => {
    setPage(value);
    dispatch(getPostByTag(tagId, perPage, value));
  };

  return deviceTheme === 'mobile' ? (
    <div>
      <div styleName="mt-4 mb-3 h5 p-2">{`搜尋結果：${tag}`}</div>
      {isEmpty(list) ? (
        <EmptyResult title="查無結果" />
      ) : (
        <Fragment>
          <SectionA max={perPage} list={list} highlight={tag} />
          <div styleName="pagination">
            <Pagination count={pages} page={page} pageChange={handleChange} />
          </div>
        </Fragment>
      )}
    </div>
  ) : (
    <Fragment>
      <SectionE
        title={`搜尋結果：${tag}`}
        list={list}
        max={perPage}
        emptyTitle="查無結果"
        highlight={tag}
      />
      <div styleName="pagination">
        <Pagination count={pages} page={page} pageChange={handleChange} />
      </div>
    </Fragment>
  );
});
