module.exports = (reserve, api, callback) => ({
  type: 'SAGA_PHOTON_TAKE',
  payload: {
    reserve,
    api,
    callback
  }
});
