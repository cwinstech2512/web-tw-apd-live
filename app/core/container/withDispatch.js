import { useStore, useDispatch } from 'react-redux';
import withHooks from './withHooks';
import { resolveStoreKey } from './_connect';
import { setDisplayName, wrapDisplayName } from 'recompose';

const storeSelector = store => (...storeKeys) => {
  switch (storeKeys.length) {
    case 0:
      return store.getState();
    case 1:
      return resolveStoreKey(store.getState())(storeKeys[0]);
    default:
      const resolveFunc = resolveStoreKey(store.getState());
      return storeKeys.map(key => resolveFunc(key));
  }
};

const withDispatch = WrapperComponent => {
  const DispatchHoc = withHooks(props => ({
    ...props,
    dispatch: useDispatch(),
    storeSelector: storeSelector(useStore())
  }))(WrapperComponent);

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(WrapperComponent, 'withDispatch'))(
      DispatchHoc
    );
  }

  return DispatchHoc;
};

export default withDispatch;
