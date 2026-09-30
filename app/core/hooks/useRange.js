import { useState } from 'react';
import { is, merge, inc, dec } from 'ramda';

/**
 * useRange
 * @param {number} start 範圍起始值
 * @param {number} end 範圍迄止值
 * @param {OptionObject} [options={}] 其他選項
 * @returns {[number, ActionsObject]}
 *
 * @typedef {Object} OptionObject
 * @desc 其他選項
 * @property {number} [defaultValue=start] 當前預設值
 * @property {boolean} [loop=false] 是否循環
 *
 * @typedef {Object} ActionsObject
 * @desc 回傳的操作
 * @property {function} set 設定當前值
 * @property {function} first 設定當前值到範圍起始值
 * @property {function} prev 設定當前值前一筆
 * @property {function} next 設定當前值下一筆
 * @property {function} last 設定當前值到範圍迄止值
 * @property {boolean} hasNext 有下一筆
 * @property {boolean} hasPrev 有前一筆
 *
 * @example
 *
 * import { useRange } from '@core/hooks'
 *
 * export const PageComponent = () => {
 *   const [active, actions] = useRange(1, 5);
 *
 *   return <di>
 *     <button onClick={actions.first} disabled={!actions.hasPrev}>第一頁</button>
 *     <button onClick={actions.prev} disabled={!actions.hasPrev}>上一頁</button>
 *     <span>{active}</span>
 *     <button onClick={actions.next} disabled={!actions.hasNext}>下一頁</button>
 *     <button onClick={actions.last} disabled={!actions.hasNext}>最末頁</button>
 *   </div>
 * }
 */
type optionType = {
  defaultValue: number,
  loop: boolean
};

const useRange = (start: number, end: number, options: optionType = {}) => {
  const { defaultValue, loop } = merge(
    { defaultValue: start, loop: false },
    options
  );

  if (
    !is(Number, start) ||
    !is(Number, end) ||
    !is(Number, defaultValue) ||
    !is(Boolean, loop)
  ) {
    throw 'useRange 參數型別錯誤';
    return;
  }
  if (end < start) {
    throw 'useRange 迄止值(end)不能小於初始值(start)';
    return;
  }
  if (defaultValue > end || defaultValue < start) {
    throw 'useRange 當前值(defaultValue)必須介於初始值(start)與迄止值(end)之間';
    return;
  }

  const [active, setActive] = useState(defaultValue);
  const actions = {};
  actions.hasNext = active < end;
  actions.hasPrev = active > start;
  actions.set = setActive;
  actions.first = () => {
    actions.set(start);
  };
  actions.prev = () => {
    if (actions.hasPrev) actions.set(dec);
    else if (loop) actions.last();
  };
  actions.next = () => {
    if (actions.hasNext) actions.set(inc);
    else if (loop) actions.first();
  };
  actions.last = () => {
    actions.set(end);
  };

  return [active, actions];
};

export default useRange;
