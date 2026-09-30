/* @flow */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import { Button } from '@material-ui/core';
import { getTagById } from '@src/libraries/axios-manager';
import { map, isEmpty } from 'ramda';
import styles from './hot-tags.scss';

export default withStyle(styles)(({ onClose, linkTo }) => {
  const dispatch = useDispatch();
  const { data, hotList } = usePathSelector('wp-tags', {
    data: {},
    hotList: []
  });

  useEffect(() => {
    /* 檢查所有都有資料 */
    if (!isEmpty(hotList)) {
      for (let i = 0; i < hotList.length; i++) {
        if (!data[hotList[i]]) dispatch(getTagById(hotList[i]));
      }
    }
  }, [hotList]);

  /* 點選tag，並關閉搜尋側欄 */
  const tagSearch = path => event => {
    linkTo(path)();
    onClose({});
  };

  return (
    <div>
      <div styleName="title">熱門關鍵字</div>
      {isEmpty(hotList) ? (
        <div styleName="empty">尚無搜尋紀錄</div>
      ) : (
        <div styleName="tags">
          {map(
            id => (
              <Button
                key={`tag-${id}`}
                styleName="tag"
                onClick={tagSearch(`/tag/${id}`)}>
                #{data[id] ? data[id].name : id}
              </Button>
            ),
            hotList
          )}
        </div>
      )}
    </div>
  );
});
