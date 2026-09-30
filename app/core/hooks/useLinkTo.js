/* @flow */
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

/**
 * useLinkTo
 * @returns {Array<number|undefined>} 螢幕寬與高，單位 px
 *
 * @example
 *
 * import { useLinkTo } from '@core/hooks'
 *
 * export const Component = () => {
 *   const linkTo = useLinkTo();
 *
 *   return <div onClick={linkTo('/')}>首頁</div>
 * }
 */
function useLinkTo() {
  const dispatch = useDispatch();
  const linkTo = (pathname: string) => () => {
    dispatch(push(pathname));
    window.scrollTo({ top: 0 });
  };

  return linkTo;
}

export default useLinkTo;
