/**
 * call
 * @desc 允許包覆一個回傳 action 物件的方法，適合用在 polling 中 payload 需有動態資料的 action
 * @param {function} func 回傳 action 的函式
 * @param {any} params 其他補充屬性
 * @return {Object}
 * @example
 *   call(() => ({ type: 'ACTION' }), a: 1, b: 2)
 *   // 結果:
 *   // {
 *   //   type: 'SAGA_CALL',
 *   //   payload: {
 *   //     func: () => ({ type: 'ACTION' }),
 *   //     params: {
 *   //       a: 1,
 *   //       b: 2
 *   //     }
 *   //   }
 *   // }
 */
const call = (func, ...params) => ({
  type: 'SAGA_CALL',
  payload: {
    func,
    params
  }
});

export default call;
