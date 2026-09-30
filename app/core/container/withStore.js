import withHooks from './withHooks';
import { usePathSelector } from '../hooks';
import { setDisplayName, wrapDisplayName } from 'recompose';

const withStore = (...storeKey) => WrapperComponent => {
  const StoreHoc = withHooks(props => {
    let response = null;
    if (storeKey) {
      switch (storeKey.length) {
        case 0:
          /* 沒有傳入值就不綁資料 */
          response = null;
          break;
        case 1:
          response = usePathSelector(storeKey[0]);
          break;
        default:
          response = storeKey.reduce((returnObj, key) => {
            returnObj[key] = usePathSelector(key);
            return returnObj;
          }, {});
          break;
      }
    }

    return {
      ...props,
      storeData: response
    };
  })(WrapperComponent);

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(WrapperComponent, 'withStore'))(
      StoreHoc
    );
  }

  return StoreHoc;
};

export default withStore;
