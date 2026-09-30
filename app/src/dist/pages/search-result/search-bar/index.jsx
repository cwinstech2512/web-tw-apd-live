/* @flow */
import React, { useState, useEffect } from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import moment from 'moment';
import { prepend, take, pipe, isNil, isEmpty } from 'ramda';
import styles from './search-bar.scss';

let localStorage = window.localStorage;

/**
 * SearchBar
 * @desc 搜尋
 */
export default withStyle(styles)(() => {
  const linkTo = useLinkTo();
  const [keyword, setKeyword] = useState('');
  const [searchList, setList] = useState([]);

  useEffect(() => {
    setList(
      isNil(localStorage.searchList) || isEmpty(localStorage.searchList)
        ? []
        : JSON.parse(localStorage.searchList)
    );
  }, [localStorage.searchList]);

  /* 輸入查詢欄位 */
  const changeInput = ({ target: { value } }) => {
    setKeyword(value);
  };

  /* 執行搜尋 */
  const btnSearch = () => {
    if (keyword === '') return;

    // 寫入搜尋紀錄暫存，並取前五
    let tempList = pipe(
      prepend({ word: keyword, date: moment().unix() }),
      take(5)
    )(searchList);
    setList(tempList);
    localStorage.searchList = JSON.stringify(tempList);

    linkTo(`/search?text=${keyword}`)(); // 搜尋
    setKeyword(''); // 清空輸入關鍵字
  };

  /* 按Enter搜尋 */
  const pressEnter = event => {
    if (event.key === 'Enter') {
      btnSearch();
    }
  };
  return (
    <div styleName="search-bar">
      <div styleName="search-bar-box">
        <input
          styleName="search-bar-input"
          placeholder="請輸入文字"
          name="keyword"
          onChange={changeInput}
          value={keyword}
          maxLength="10"
          onKeyPress={pressEnter}
        />
        <div styleName="search-bar-btn" onClick={btnSearch}>
          <span aria-hidden="true">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>
    </div>
  );
});
