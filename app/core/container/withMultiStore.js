import withHooks from './withHooks';
import { usePathSelector } from '../hooks';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { zipObj, mapObjIndexed, invertObj } from 'ramda';

/**
 * withMultiStore
 * @desc 綁定多個 store，原有的 withStore 綁定多個 store 會導致渲染
 * @param {any} storeKeys
 * @example
 *  withMultiStore({'store-account': 'account'}) // component get props.account
 *  withMultiStore('store-account', 'store-games') // component get props['store-account'] and props['store-games'], same as withMultiStore(['store-account', 'store-games'])
 *  withMultiStore(['store-account']) // component get props['store-account']
 *  withMultiStore('store-account') // component get props.storeData
 */
const withMultiStore = (...storeKeys) => {
  let keysObj = {};
  switch (storeKeys.length) {
    case 0:
      /**
       * withStore()
       */
      return withStore();
    case 1:
      /**
       * 1.withMultiStore('store-account')
       * 2.withMultiStore(['store-account', ...])
       * 3.withMultiStore({'store-account': 'account', ...})
       */
      const [firstArg] = storeKeys;
      if (typeof firstArg === 'string') {
        /* 1. */
        return withStore(firstArg);
      } else if (Array.isArray(firstArg)) {
        /* 2. */
        keysObj = zipObj(firstArg, firstArg);
      } else {
        /* 3. */
        keysObj = invertObj(firstArg);
      }
      break;
    default:
      keysObj = zipObj(storeKeys, storeKeys);
      break;
  }

  return WrapperComponent => {
    const MultiStoreHoc = withHooks(props => ({
      ...props,
      ...mapObjIndexed(usePathSelector, keysObj)
    }))(WrapperComponent);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(
        wrapDisplayName(WrapperComponent, 'withMultiStore')
      )(MultiStoreHoc);
    }

    return MultiStoreHoc;
  };
};

export default withMultiStore;
