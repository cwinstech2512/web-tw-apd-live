/* @flow */
import React, { useEffect, useState } from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import { useSwipeable } from 'react-swipeable';
import { Drawer, Toolbar } from '@material-ui/core';
import Logo from '@src/dist/shared/gear/logo';
import SearchBar from './search-bar';
import HotTags from './hot-tags';
import { map, isEmpty, isNil, prepend, take, pipe } from 'ramda';
import moment from 'moment';
import styles from './search-drawer.scss';

type Props = {
  open: boolean,
  onClose: any
};

let localStorage = window.localStorage;
export default withStyle(styles)(({ open, onClose }: Props) => {
  const linkTo = useLinkTo();
  const [searchList, setList] = useState([]);

  const swiped = useSwipeable({
    onSwipedLeft: eventData => {
      onClose({}); //關閉側欄
    }
  });

  useEffect(() => {
    setList(
      isNil(localStorage.searchList) || isEmpty(localStorage.searchList)
        ? []
        : JSON.parse(localStorage.searchList)
    );
  }, [localStorage.searchList]);

  /* 清除搜尋紀錄 */
  const clearSearch = () => {
    localStorage.searchList = '[]';
    setList([]);
  };

  /* 搜尋紀錄點選搜尋，並關閉搜尋側欄 */
  const historySearch = path => event => {
    linkTo(path)();
    onClose({});
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose} {...swiped}>
      <div styleName="drawer">
        <Toolbar styleName="drawer-toolbar">
          <div styleName="flex-fill">
            <Logo type={'white'} />
          </div>
          <button
            type="button"
            styleName="btn btn-icon"
            aria-label="close"
            onClick={onClose}
            onKeyDown={onClose}>
            <span aria-hidden="true">
              <i class="fas fa-times"></i>
            </span>
          </button>
        </Toolbar>

        <SearchBar
          onClose={onClose}
          setList={setList}
          searchList={searchList}
          linkTo={linkTo}
        />

        <HotTags onClose={onClose} linkTo={linkTo} />

        <div>
          <div styleName="history-title">
            搜尋紀錄
            <div
              styleName="history-clear"
              onClick={clearSearch}
              onKeyDown={clearSearch}>
              清除記錄
            </div>
          </div>
          {isEmpty(searchList) ? (
            <div styleName="history-empty">尚無搜尋紀錄</div>
          ) : (
            <div>
              {map(
                ({ word, date }) => (
                  <div
                    key={`history-item-${date}`}
                    styleName="history-item"
                    onClick={historySearch(`/search?text=${word}`)}>
                    <div styleName="history-word">{word}</div>
                    <span styleName="history-date">
                      {moment(date * 1000).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                  </div>
                ),
                searchList
              )}
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
});
