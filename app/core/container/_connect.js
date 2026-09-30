import { connect as reduxConnect } from 'react-redux';
import {
  pipe,
  split,
  path,
  __,
  toPairs,
  keys,
  head,
  join,
  reduce
} from 'ramda';

export const resolveStoreKey = (store: Object) => (
  storeKey: string | Object
) => {
  if (!store) return null;

  if (storeKey.includes('.')) {
    const res = pipe(split('.'), path((__: any), store))(storeKey);
    return res === 'undefined' ? null : res;
  } else return typeof store[storeKey] === 'undefined' ? null : store[storeKey];
};

/**
 * 多國語系
 * @param wrapperComponent
 * @returns {(component:P) => P}
 */
export const _connect3 = () =>
  reduxConnect(
    state => ({
      i18nLang: state.i18nState.lang
    }),
    null,
    (stateProps, dispatchProps, ownProps) => ({
      ...stateProps,
      ...ownProps
    }),
    {
      pure: true,
      withRef: false
    }
  );
