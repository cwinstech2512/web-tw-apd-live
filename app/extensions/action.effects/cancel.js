/**
 * cancel
 * @desc 取消特定 effects，適合搭配 delay、polling 使用
 * @param {Object} action
 * @return {Object}
 * @example
 *   cancel({ type: 'ACTION' })
 *   // 結果:
 *   // {
 *   //   type: 'SAGA_CANCEL',
 *   //   payload: {
 *   //     action: { type: 'ACTION' }
 *   //   }
 *   // }
 */
const cancel = action => ({
  type: 'SAGA_CANCEL',
  payload: {
    action
  }
});

export default cancel;
