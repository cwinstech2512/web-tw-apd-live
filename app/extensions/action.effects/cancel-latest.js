/**
 * cancelLatest
 * @desc 取消最後一筆發出的 effects
 * @return {Object}
 * @example
 *   cancelLatest()
 *   // 結果:
 *   // {
 *   //   type: 'SAGA_CANCEL_LATEST'
 *   // }
 */
const cancelLatest = () => ({
  type: 'SAGA_CANCEL_LATEST'
});

export default cancelLatest;
