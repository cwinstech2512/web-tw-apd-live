/**
 * delay
 * @desc 延遲 action 被 dispatch 的時間
 * @param {number} duration 延遲時間，單位：milliseconds
 * @param {Object} action
 * @return {Object}
 * @example
 *   delay(1000, { type: 'ACTION' })
 *   // 結果: 延後 1 秒才 dispatch({ type: 'ACTION' })
 *   // {
 *   //   type: 'SAGA_DELAY',
 *   //   payload: {
 *   //     action: { type: 'ACTION' },
 *   //     duration: 1000
 *   //   }
 *   // }
 */
const delay = (duration, action) => ({
  type: 'SAGA_DELAY',
  payload: {
    action,
    duration
  }
});

export default delay;
