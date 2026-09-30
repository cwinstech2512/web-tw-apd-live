/* @flow */
import { reducerCreator } from '@core/reducer';

import { pickId } from '@src/helper/transformData';
import { reduce, assoc, map, concat, uniq, pipe } from 'ramda';
/* action type */
export const TAG_LIST = 'TAG_LIST';
export const TAG_HOT_LIST = 'TAG_HOT_LIST';
export const TAG_RESTORE = 'TAG_RESTORE';

type Tag = {
  id: number,
  count: number,
  description: string,
  name: string,
  slug: string,
  enable: boolean
};

export const defaultState = {
  data: {}, // 放所有Tag資料
  tagList: [], // 放所有Tag Id
  hotList: []
};

/* 底線開頭 */
const reDisable = new RegExp('^_.*');

export default reducerCreator(defaultState, {
  /* 增加資料 */
  [TAG_LIST]: (
    { data: preData, tagList: preList, hotList },
    tags: Array<Tag> = []
  ) => {
    /* 過濾資料 */
    const reduceData = map(({ id, description, name, slug, count }) => ({
      id,
      description,
      name,
      slug,
      count,
      enable: !reDisable.test(slug)
    }))(tags);

    return {
      hotList,
      tagList: pipe(pickId, concat(preList), uniq)(reduceData),
      data: reduce(
        (orign, { id, ...other }) => (assoc: any)('' + id, other || '', orign),
        preData,
        reduceData
      )
    };
  },

  [TAG_HOT_LIST]: (state, hotList) => ({
    ...state,
    hotList
  }),

  [TAG_RESTORE]: () => defaultState
});
