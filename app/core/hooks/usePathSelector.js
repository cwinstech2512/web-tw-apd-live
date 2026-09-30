import { useSelector } from 'react-redux';
import { pipe, path, defaultTo, is, split } from 'ramda';

/**
 * usePathSelector
 * @link https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.js
 * @param {Array<string|number>|string} [statePath=[]] 目標路徑
 * @param {any} [defaultValue=null] 找不到的時候要回傳的值
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import { usePathSelector } from '@core/hooks'
 *
 * export const CounterComponent = () => {
 *   const counter = usePathSelector(['counter'], 0);
 *   // = const counter = usePathSelector('counter', 0);
 *   return <div>{counter}</div>
 * }
 */
const usePathSelector = (statePath = [], defaultValue = null) => {
  if (is(Array, statePath))
    return useSelector(pipe(path(statePath), defaultTo(defaultValue)));

  return useSelector(
    pipe(path(split('.', statePath)), defaultTo(defaultValue))
  );
};

export default usePathSelector;
