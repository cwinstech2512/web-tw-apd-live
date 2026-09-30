import CSSModules from 'react-css-modules';
import { styleCombine } from './_css-module';
import { setDisplayName, wrapDisplayName } from 'recompose';

const styleHoc = (...styles) => WrapperComponent => {
  const CssHoc = CSSModules(WrapperComponent, styleCombine(...styles), {
    allowMultiple: true
  });
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(WrapperComponent, 'withStyle'))(
      CssHoc
    );
  }
  return CssHoc;
};
export default styleHoc;
