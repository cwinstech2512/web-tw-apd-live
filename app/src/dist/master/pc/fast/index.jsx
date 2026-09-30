/* @flow */
import React, { useState, useEffect } from 'react';
import { useLinkTo } from '@core/hooks';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import SearchBar from './search-bar';
import { requestInterval } from '@core/helpers/raf-timer';
import { map, addIndex, isEmpty } from 'ramda';
import styles from './fast.scss';

const mapIndexed = addIndex(map);

let first = false;
export default withStyle(styles)(() => {
  const linkTo = useLinkTo();

  const { posts, fast } = usePathSelector('wp-posts', {});
  const [state, setState] = useState({
    prev: -1,
    active: 0
  });

  const intervalFunction = () => {
    setState(state => ({
      ...state,
      prev: state.active,
      active: state.active + 1 > fast.length - 1 ? 0 : state.active + 1
    }));
  };

  let request: ?Object = null;

  useEffect(() => {
    /* 開始輪播 ，延遲 n 秒 */
    if (fast.length > 0) {
      first = true;
      request && request.clear();
      request = requestInterval(intervalFunction, 5000);
    }

    return () => {
      /* 終止輪播 */
      if (request) request.clear();
      request = null;
    };
  }, [fast.length]);

  if (isEmpty(fast)) return null;

  return (
    <div styleName="fast-container">
      <div styleName="wrapper fast">
        <div styleName="fast-title">快訊</div>
        <div styleName="fast-box">
          {mapIndexed(
            (id, index) => (
              <div
                key={`fast-${id}`}
                onClick={linkTo(`/article/${id}`)}
                styleName={`fast-content ${state.prev === index ? 'prev' : ''} 
                ${state.active === index ? 'active' : ''}`}>
                <div styleName="fast-item">{posts[id].title}</div>
              </div>
            ),
            fast
          )}
        </div>
        <div styleName="fast-search">
          <SearchBar />
        </div>
      </div>
    </div>
  );
});
