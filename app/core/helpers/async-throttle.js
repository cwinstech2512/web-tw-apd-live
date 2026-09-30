import { throttle } from 'lodash';

export function throttleEventHandler(...args) {
  const throttled = throttle(...args);
  return e => {
    e.persist();
    return throttled(e);
  };
}
