import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

const isBrowser = typeof window !== `undefined`;
/**
 * useScrollPosition
 * @link https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
 * // @returns {Array<number|undefined>} 螢幕寬與高，單位 px
 *
 * @example
 *
 * import { useScrollPosition } from '@core/hooks'
 *
 * export const Component = () => {
 *   const [width, height] = useWindowSize();
 *
 *   return <div>window size: {width}px / {height}px</div>
 * }
 */
function getScrollPosition({ element = false, useWindow = false }) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}

export function useScrollPosition(
  effect,
  deps = [],
  element: boolean = false,
  useWindow: boolean = false,
  wait = null
) {
  const position = useRef(getScrollPosition({ useWindow }));

  let throttleTimeout = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return;
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, deps);
}

export default useScrollPosition;
