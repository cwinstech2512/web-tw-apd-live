/* @flow */
import { curry, pick, keys } from 'ramda';

/**
 * assign
 * @desc 使用 Object.assign 去覆寫資料，過程中會經過鍵值的篩選
 * @param {TargetObject} target 要被寫入的目標物件
 * @param {Object} assignObj 寫入的資料
 * @return {TargetObject} 與傳入的target型別一樣的物件
 *
 * @typedef {Object} TargetObject
 *
 * @example
 *   assign({a:1, b:2, c:3}, {a,10, b:10, d:10})
 *   // 結果: {a:10, b:10, c:3}
 */
const assign: any = curry(<T>(target: T, assignObj: Object): T =>
  Object.assign(target, pick(keys((target: any)), assignObj))
);

export default assign;
