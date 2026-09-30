/* @flow */
import { compose, withStyle } from '@core/container';
import {
  defaultProps,
  withProps,
  withPropsOnChange,
  lifecycle,
  withHandlers,
  withStateHandlers
} from 'recompose';

/* helper */
import { requestInterval } from '@core/helpers/raf-timer';
import { map, addIndex, pipe, prop, isEmpty } from 'ramda';

/* style */
import bannerStyles from './banner.scss';

/**
 * withAnimateFlow
 * @desc 動畫
 * @property {array} list 輪播清單
 */
export const withAnimateFlow = (limitTime: number) =>
  compose(
    withProps(({ list = [] }) => ({
      maxIndex: list.length - 1,
      /* 重新定義 list 格式 */
      list: addIndex(map)(
        (obj, index) => ({
          index,
          ...obj
        }),
        list
      )
    })),
    withStateHandlers(
      ({ maxIndex }) => ({
        prev: maxIndex,
        active: 0
      }),
      {
        changeActive: ({ active }) => (index: number) => ({
          prev: active,
          active: index
        }),
        changeToPrev: ({ prev, active }, { maxIndex }) => () => {
          return {
            prev: prev - 1 < 0 ? maxIndex : prev - 1,
            active: prev
          };
        },
        changeToNext: ({ active }, { maxIndex }) => () => {
          return {
            prev: active,
            active: active + 1 > maxIndex ? 0 : active + 1
          };
        },
        initState: (_, { maxIndex }) => _ => ({
          prev: maxIndex,
          active: 0
        })
      }
    ),
    /* 資料改變的時候一定要初始化資料 */
    withPropsOnChange(['list'], ({ list, initState }) => {
      initState();
      return {};
    }),
    withHandlers({
      getActive: ({ active }) => () => active,
      getMaxIndex: ({ maxIndex }) => () => maxIndex
    }),
    withHandlers(({ getMaxIndex, getActive, changeActive }) => {
      let request: ?Object = null;
      return {
        handleStart: _ => _ => {
          if (request) request.clear();
          /* 開始輪播: 間隔 limitTime 秒 */
          request = requestInterval(_ => {
            /* 下一筆 index */
            const nextIndex = getActive() + 1;
            /* 更新 index */
            changeActive(nextIndex > getMaxIndex() ? 0 : nextIndex);
          }, limitTime);
        },
        handleStop: _ => _ => {
          /* 終止輪播 */
          if (request) request.clear();
          request = null;
        }
      };
    }),
    /* 當前索引變更，動畫時間重新計算 */
    withPropsOnChange(['active'], ({ active, handleStart }) => {
      handleStart();
      return {};
    })
  );

/**
 * withAnimateLifecycle
 * @desc 動畫的生命週期
 * @requires _withAnimateFlow
 * @property {function} handleStart 動畫開始 from _withAnimateFlow
 * @property {function} handleStop 動畫結束 from _withAnimateFlow
 */
export const withAnimateLifecycle = lifecycle({
  componentDidMount() {
    this.props.handleStart();
  },
  componentWillUnmount() {
    this.props.handleStop();
  }
});

const withComposeHandler = (styleObj: Object, limitTime: number) =>
  compose(
    withAnimateFlow(limitTime),
    withAnimateLifecycle,
    withStyle(styleObj)
  );

export const withBannerHandler = withComposeHandler(bannerStyles, 5000);
