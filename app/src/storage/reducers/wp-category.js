/* @flow */
import { reducerCreator } from '@core/reducer';
import {
  FAST,
  FOCUS,
  YOUTUBE,
  AD,
  VIDEO,
  GALLERY,
  MOBILE_POPAD
} from '@src/constant/feature';
import {
  sortBy,
  prop,
  reduce,
  filter,
  assoc,
  map,
  find,
  propEq,
  forEach
} from 'ramda';

/* action type */
export const CATEGORY_LIST = 'CATEGORY_LIST';
export const CATEGORY_RESTORE = 'CATEGORY_RESTORE';

type category = {
  id: number,
  description: string,
  name: string,
  count: number,
  slug: string, // 排序依據
  parent: number
};

export const defaultState = {
  length: 0, // 主分類的個數
  data: {}, // 全部的資料(過濾隱藏的分類、過濾資料、過濾特殊功能)
  treeData: {}, // 主分類與副分類的結構
  [FAST]: {},
  [GALLERY]: {},
  [FOCUS]: {},
  [AD]: {},
  [YOUTUBE]: {},
  [VIDEO]: {},
  [MOBILE_POPAD]: {}
};

/* 底線開頭 */
const reDisable = new RegExp('^_.*');
/* 底線開頭 */
const reFeature = new RegExp('^n_.*');

export default reducerCreator(defaultState, {
  /* 過濾隱藏的分類、過濾資料、過濾特殊功能、排序 */
  [CATEGORY_LIST]: (state, categories: Array<category> = []) => {
    /* 過濾資料 */
    const reduceData = map(
      ({ id, description, name, slug, parent, count }) => ({
        id,
        description,
        name,
        slug: decodeURIComponent(slug),
        parent,
        count
      })
    )(categories);

    /* 過濾隱藏的分類、過濾特殊功能 */
    const mainCategories = filter(
      ({ slug }) => !reFeature.test(slug) && !reDisable.test(slug)
    )(reduceData);

    /* 拆分主分類、副分類 */
    const sortData = sortBy(prop('slug'))(mainCategories);
    let treeData = {};
    forEach(({ parent, id }) => {
      if (treeData['' + parent] === undefined) treeData['' + parent] = [];
      treeData['' + parent].push('' + id);
    })(sortData);

    return {
      length: treeData['0'].length,
      data: reduce(
        (orign, { id, ...other }) => (assoc: any)('' + id, other || '', orign),
        {},
        mainCategories
      ),
      treeData,
      [FAST]: find(propEq('slug', FAST))(reduceData),
      [GALLERY]: find(propEq('slug', GALLERY))(reduceData),
      [FOCUS]: find(propEq('slug', FOCUS))(reduceData),
      [YOUTUBE]: find(propEq('slug', YOUTUBE))(reduceData),
      [AD]: find(propEq('slug', AD))(reduceData),
      [VIDEO]: find(propEq('slug', VIDEO))(reduceData),
      [MOBILE_POPAD]: find(propEq('slug', MOBILE_POPAD))(reduceData)
    };
  },

  [CATEGORY_RESTORE]: () => defaultState
});
