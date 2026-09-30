import { useState } from 'react';
import { not, is } from 'ramda';

/**
 * useOnOff
 * @param {boolean} [defaultValue=false] state 預設值
 * @returns {[boolean, function]}
 *
 * @example
 *
 * import { useOnOff } from '@core/hooks'
 *
 * export const TriggerComponent = () => {
 *   const [flag, toggleHandler] = useOnOff(true);
 *
 *   return <button onClick={toggleHandler}>狀態：{flag ? '開' : '關'}</button>
 * }
 */
const useOnOff = (defaultValue: boolean = false) => {
  if (!is(Boolean, defaultValue)) {
    throw 'useOnOff 只接受布林值';
    return;
  }
  const [flag, setFlag] = useState(defaultValue);
  return [flag, () => setFlag(not)];
};

export default useOnOff;
