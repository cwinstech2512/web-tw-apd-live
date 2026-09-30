/**
 * polling
 * @desc 輪詢 action
 * @param {number} interval 間隔時間，單位：milliseconds
 * @param {Object} action
 * @return {Object}
 * @example
 *   polling(3000, { type: 'ACTION' })
 *   // 結果: 每隔 3 秒，dispatch 一次 { type: 'ACTION' }
 *   // {
 *   //   type: 'SAGA_POLLING',
 *   //   payload: {
 *   //     action: { type: 'ACTION' },
 *   //     interval: 3000,
 *   //   }
 *   // }
 */
const polling = (interval, action) => ({
  type: 'SAGA_POLLING',
  payload: {
    action,
    interval
  }
});

export default polling;
