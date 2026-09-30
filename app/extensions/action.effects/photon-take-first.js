module.exports = (api, callback) => ({
  type: 'SAGA_PHOTON_TAKE',
  payload: {
    reserve: 1,
    api,
    callback
  }
});
