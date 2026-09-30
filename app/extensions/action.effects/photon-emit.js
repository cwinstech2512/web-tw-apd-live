module.exports = ({ code, ...payload }) => ({
  type: 'SAGA_PHOTON_EMIT',
  payload: {
    code,
    data: payload
  }
});
