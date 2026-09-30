import { objectEqual } from '@core/helpers/equal';

module.exports = opts => ({ type, payload: { code, data } }) =>
  type === 'SAGA_PHOTON_EMIT' && objectEqual(opts, { code, ...data });
