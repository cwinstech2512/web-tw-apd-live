/**
 * cancelAll
 * @desc 取消所有執行中的 effects
 * @return {Object}
 * @example
 *   cancelAll()
 *   // 結果:
 *   // {
 *   //   type: 'SAGA_CANCEL_ALL'
 *   // }
 */
const cancelAll = () => ({
  type: 'SAGA_CANCEL_ALL'
});

export default cancelAll;
