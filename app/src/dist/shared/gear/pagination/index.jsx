/* @flow */
import React from 'react';
import { withStyle } from '@core/container';
import { IconButton } from '@material-ui/core';
import { take, takeLast, times, map } from 'ramda';
import styles from './pagination.scss';

/**
 * Pagination
 * @desc 分頁元件
 * @property {number} count 總頁數
 * @property {number} page 當頁頁碼
 * @property {function} pageChange 處理換頁的方法
 * @example
 *   <Pagination count={pages} page={page} pageChange={pageChange} />
 */
export default withStyle(styles)(({ count, page, pageChange }) => {
  /* 僅一頁不需要顯示 */
  if (count <= 1) return null;

  const doNothing = () => null;
  const nextDisable = page === count;
  const preDisable = page === 1;

  const allPage = times(n => n + 1, count);
  let pageList = [];
  if (page === 1) pageList = take(3, allPage);

  if (page === count) pageList = takeLast(3, allPage);

  if (page !== 1 && page !== count) {
    pageList = [page - 1, page, page + 1];
  }

  return (
    <div styleName="pagination">
      <IconButton
        styleName={`pagination-item ${
          preDisable ? 'pagination-item--disable' : ''
        }`}
        aria-label="first page"
        onClick={!preDisable ? pageChange(1) : doNothing}>
        <span aria-hidden="true">
          <i class="fas fa-angle-double-left"></i>
        </span>
      </IconButton>
      <IconButton
        styleName={`pagination-item ${
          preDisable ? 'pagination-item--disable' : ''
        }`}
        aria-label="previous page"
        onClick={!preDisable ? pageChange(page - 1) : doNothing}>
        <span aria-hidden="true">
          <i class="fas fa-angle-left"></i>
        </span>
      </IconButton>
      {map(
        p => (
          <IconButton
            key={`page-${p}`}
            styleName={`pagination-item ${
              page === p ? 'pagination-item--active' : ''
            }`}
            aria-label={`page ${p}`}
            onClick={page !== p ? pageChange(p) : doNothing}>
            {p}
          </IconButton>
        ),
        pageList
      )}
      <IconButton
        styleName={`pagination-item ${
          nextDisable ? 'pagination-item--disable' : ''
        }`}
        aria-label="next page"
        onClick={!nextDisable ? pageChange(page + 1) : doNothing}>
        <span aria-hidden="true">
          <i class="fas fa-angle-right"></i>
        </span>
      </IconButton>
      <IconButton
        styleName={`pagination-item ${
          nextDisable ? 'pagination-item--disable' : ''
        }`}
        aria-label="last page"
        onClick={!nextDisable ? pageChange(count) : doNothing}>
        <span aria-hidden="true">
          <i class="fas fa-angle-double-right"></i>
        </span>
      </IconButton>
    </div>
  );
});
