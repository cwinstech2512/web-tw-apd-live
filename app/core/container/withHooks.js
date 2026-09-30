import { createFactory } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

const withHooks = fn => WrapperComponent => {
  const factory = createFactory(WrapperComponent);
  const HooksHoc = props =>
    factory({
      ...props,
      ...fn(props)
    });
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(WrapperComponent, 'withHooks'))(
      HooksHoc
    );
  }
  return HooksHoc;
};

export default withHooks;
