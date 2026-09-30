/* @flow */
import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { usePathSelector, useBreakPoint } from '@core/hooks';
import { withStyle } from '@core/container';

import { getPostBySearch } from '@src/libraries/axios-manager';

import { ErrorMsg, EmptyResult } from '@src/dist/shared/gear/error-block';
import { SectionA, SectionE } from '@src/dist/shared/gear/section';
import Pagination from '@src/dist/shared/gear/pagination';
import SearchBar from './search-bar';

import queryString from 'query-string';
import { has, isEmpty } from 'ramda';

import styles from './search.scss';

const perPage = 15;
/**
 * Search
 * @desc 搜尋結果、hashtag結果列表
 * @example
 *   <Search />
 */
export default withStyle(styles)(({ location }) => {
  const dispatch = useDispatch();
  const deviceTheme = useBreakPoint();
  const [state, setState] = useState({ valid: true, text: '' });
  const {
    posts,
    search: {
      list,
      pagination: { total, pages, now }
    }
  } = usePathSelector('wp-posts', {});
  const [page, setPage] = useState(1);

  useEffect(() => {
    /* 檢查query string，並搜尋相關文章 */
    const values = queryString.parse(location.search);
    if (has('text', values)) {
      setState({ valid: true, text: values.text });
      dispatch(getPostBySearch(values.text, perPage, 1));
    } else {
      setState({ valid: false, text: '' });
    }
  }, [location.search]);

  if (!state.valid) return <ErrorMsg />;

  /* 處理換頁 */
  const handleChange = value => () => {
    setPage(value);
    dispatch(getPostBySearch(state.text, perPage, value));
  };

  return deviceTheme === 'mobile' ? (
    <div>
      <div styleName="mt-4 mb-3 h5 p-2">{`搜尋結果：${state.text}`}</div>
      <SearchBar />
      {isEmpty(list) ? (
        <EmptyResult title="查無結果" />
      ) : (
        <Fragment>
          <SectionA max={perPage} list={list} highlight={state.text} />
          <div styleName="pagination">
            <Pagination count={pages} page={page} pageChange={handleChange} />
          </div>
        </Fragment>
      )}
    </div>
  ) : (
    <Fragment>
      <SectionE
        title={`搜尋結果：${state.text}`}
        list={list}
        max={perPage}
        emptyTitle="查無結果"
        highlight={state.text}
      />
      <div styleName="pagination">
        <Pagination count={pages} page={page} pageChange={handleChange} />
      </div>
    </Fragment>
  );
});
